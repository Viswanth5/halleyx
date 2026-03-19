import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    // Authenticate the user using the JWT from the request
    const authHeader = req.headers.get('Authorization')?.replace('Bearer ', '')
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    // Get the summary from the request body
    const { summary } = await req.json()

    // Build prompt for Gemini
    const prompt = `
You are a business analyst. Based on the following sales summary, provide 2-3 concise, actionable insights. 
Highlight trends, anomalies, or key points. Keep it under 100 words and use friendly, professional language.

Summary:
${JSON.stringify(summary, null, 2)}
`

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

    const geminiPayload = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    }

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    })
    const geminiData = await geminiRes.json()
    const insight = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No insights generated.'

    return new Response(JSON.stringify({ insight }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})