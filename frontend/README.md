WEBSITE LINK : https://halleyx-sage.vercel.app/

Halleyx Dashboard

A fully customizable, real-time dashboard for visualizing business data.  
Built with Supabase (PostgreSQL + Auth) and pure HTML, CSS, and JavaScript, this app allows users to create their own analytics workspace using drag-and-drop widgets.

---

 Features

Authentication

  Secure login using Supabase Auth. Each user can only access their own data.

Rich Widgets

  Supports:
  - Bar Charts  
  - Line Charts  
  - Area Charts  
  - Pie Charts  
  - Scatter Plots  
  - Data Tables  
  - KPI Cards  

Drag-and-Drop Layout

  Built with GridStack.js for easy widget placement, resizing, and reordering.

Widget Customization  
  Configure:
  - Title  
  - Colors  
  - Axes  
  - Aggregation (sum, avg, count)

Real-Time Updates  
  Dashboard updates instantly when new data is added.

Global Filters

  Filter across all widgets:
  - Status  
  - Product  
  - Customer Name  

Drill-Down Analysis

  Click chart elements to view detailed underlying data.


Export Options 

  - Export dashboard as PDF  
  - Export data as Excel  

Persistent Layout

  Dashboard configurations are saved and reloaded automatically.

Collaborative Editing

  Multiple users can edit and see updates in real-time.

 Tech Stack
 Frontend   HTML5, CSS3, Tailwind CSS, JavaScript (ES6)
 UI Libraries  GridStack.js, Chart.js, DataTables 
 Export Tools  html2canvas, jsPDF, SheetJS 
 Backend     Supabase (PostgreSQL, Auth, Realtime) 
Icons       Font Awesome 6 

 Prerequisites

- Supabase account (https://supabase.com)
- Modern web browser (Chrome, Firefox, Edge, Safari)
 Setup & Installation

 1. Clone Repository

```bash
git clone https://github.com/your-username/halleyx-dashboard.git
cd halleyx-dashboard

for test case :
use the 
email: test@gmail.com
password : Viswa@05