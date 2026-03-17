// Export functions for dashboard (PDF and Excel)
// Depends on: html2canvas, jspdf, XLSX (SheetJS), and global ordersData

(function() {
    // Ensure dependencies are loaded
    if (typeof html2canvas === 'undefined') {
        console.error('html2canvas not loaded');
        return;
    }
    if (typeof jspdf === 'undefined') {
        console.error('jsPDF not loaded');
        return;
    }
    if (typeof XLSX === 'undefined') {
        console.error('SheetJS (XLSX) not loaded');
        return;
    }

    // Get the dashboard grid element
    function getGridElement() {
        return document.getElementById('dashboardGrid');
    }

    // Show a temporary message
    function showToast(message, type = 'info') {
        // Use existing toast if available, otherwise create a simple alert
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMessage');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } else {
            alert(message);
        }
    }

    // Export as PDF
    window.exportDashboardAsPDF = function() {
        const element = getGridElement();
        if (!element) {
            showToast('Dashboard grid not found', 'error');
            return;
        }

        // Show loading
        showToast('Generating PDF...', 'info');

        // Use html2canvas to capture the grid
        html2canvas(element, {
            scale: 2, // Higher quality
            backgroundColor: '#ffffff',
            logging: false,
            allowTaint: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width * 0.75, canvas.height * 0.75] // Fit to page
            });

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75);
            pdf.save('dashboard-report.pdf');
            showToast('PDF downloaded successfully', 'success');
        }).catch(error => {
            console.error('PDF generation error:', error);
            showToast('Failed to generate PDF', 'error');
        });
    };

    // Export as Excel (orders data)
    window.exportDashboardAsExcel = function() {
        // Access global ordersData (set by configure-dashboard.html)
        if (typeof window.ordersData === 'undefined' || !window.ordersData.length) {
            showToast('No data to export', 'error');
            return;
        }

        try {
            // Convert ordersData to worksheet
            const worksheet = XLSX.utils.json_to_sheet(window.ordersData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

            // Generate Excel file
            XLSX.writeFile(workbook, 'dashboard-data.xlsx');
            showToast('Excel downloaded successfully', 'success');
        } catch (error) {
            console.error('Excel generation error:', error);
            showToast('Failed to generate Excel', 'error');
        }
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('exportDropdown');
        const exportBtn = document.getElementById('exportDropdownBtn');
        if (dropdown && exportBtn && !exportBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // Toggle dropdown
    window.toggleExportDropdown = function() {
        const dropdown = document.getElementById('exportDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };
})();