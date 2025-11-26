// Function to fetch forms from the content directory
async function fetchForms() {
    try {
        // In a real implementation, this would fetch from the actual API
        // For demonstration, we're using mock data
        const forms = [
            {
                title: "Membership Application Form",
                description: "Complete this form to apply for membership with Mgrand Sacco",
                file: "/files/membership-application.pdf",
                category: "Membership",
                date: "2023-07-20T10:00:00Z",
                featured: true
            },
            {
                title: "Loan Application Form",
                description: "Apply for a loan by completing this comprehensive application form",
                file: "/files/loan-application.pdf",
                category: "Loan",
                date: "2023-07-20T10:00:00Z",
                featured: true
            },
            {
                title: "Guarantor Form",
                description: "Form to be completed by individuals guaranteeing a loan",
                file: "/files/guarantor-form.pdf",
                category: "Guarantor",
                date: "2023-07-20T10:00:00Z",
                featured: false
            },
            {
                title: "KYC (Know Your Customer) Form",
                description: "Customer identification and verification form",
                file: "/files/kyc-form.pdf",
                category: "KYC",
                date: "2023-07-20T10:00:00Z",
                featured: false
            }
        ];

        return forms;
    } catch (error) {
        console.error('Error fetching forms:', error);
        return [];
    }
}

// Function to create a form card HTML element
function createFormCard(form) {
    const categoryColors = {
        "Membership": "primary",
        "Loan": "success",
        "Guarantor": "warning",
        "KYC": "info",
        "Other": "secondary"
    };

    const color = categoryColors[form.category] || "secondary";

    return `
        <div class="col-lg-4 col-md-6">
            <div class="card download-card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="form-icon me-3">
                            <i class="fas fa-file-pdf fa-2x text-danger"></i>
                        </div>
                        <h5 class="card-title mb-0">${form.title}</h5>
                    </div>
                    <p class="card-text">${form.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-${color}">${form.category}</span>
                        <a href="${form.file}" class="btn btn-sm btn-primary" download>
                            <i class="fas fa-download me-1"></i> Download
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to render forms in the specified container
function renderForms(forms, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (forms.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-4">No forms available in this category.</div>';
        return;
    }

    container.innerHTML = forms.map(form => createFormCard(form)).join('');
}

// Function to initialize the downloads page
async function initDownloadsPage() {
    const forms = await fetchForms();

    // Render all forms
    renderForms(forms, 'all-forms');

    // Render forms by category
    const categories = ['membership', 'loan', 'guarantor', 'kyc', 'other'];
    categories.forEach(category => {
        const categoryForms = forms.filter(form => 
            form.category.toLowerCase() === category
        );
        renderForms(categoryForms, `${category}-forms`);
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initDownloadsPage);
