const internshipsContainer =
    document.getElementById("internshipsContainer");

function displayInternships(list) {
    if (!internshipsContainer) return;

    if (!list.length) {
        internshipsContainer.innerHTML =
            '<p class="empty-message">No internships found.</p>';
        return;
    }

    internshipsContainer.innerHTML = list.map(item => `
        <div class="opportunity-card">
            <h3>${item.title}</h3>
            <p class="company-name">${item.company}</p>
            <div class="opportunity-meta">
                <span>${item.location}</span>
                <span>${item.salary}</span>
                <span>${item.duration}</span>
            </div>
            <p>${item.description}</p>
            <button class="btn-primary apply-btn"
                onclick="applyForInternship(${item.id})">
                Apply Now
            </button>
        </div>
    `).join("");
}

function applyForInternship(id) {
    const user = getCurrentUser();

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const internship = opportunities.find(item => item.id === id);

    if (!internship) return;

    saveApplication({
        opportunityId: internship.id,
        title: internship.title,
        company: internship.company,
        type: internship.type,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    });
}

function filterInternships() {
    const search = document.getElementById("internshipSearch").value.toLowerCase();
    const category = document.getElementById("internshipCategory").value;

    const filtered = opportunities.filter(item =>
        item.type === "Internship" &&
        (item.title.toLowerCase().includes(search) ||
         item.company.toLowerCase().includes(search)) &&
        (!category || item.category === category)
    );

    displayInternships(filtered);
}

if (internshipsContainer) {
    displayInternships(
        opportunities.filter(item => item.type === "Internship")
    );

    document.getElementById("searchInternships")
        .addEventListener("click", filterInternships);

    document.getElementById("internshipSearch")
        .addEventListener("input", filterInternships);

    document.getElementById("internshipCategory")
        .addEventListener("change", filterInternships);
}