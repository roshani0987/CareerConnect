const jobsContainer = document.getElementById("jobsContainer");

function displayJobs(list) {
    if (!jobsContainer) return;

    if (!list.length) {
        jobsContainer.innerHTML =
            '<p class="empty-message">No jobs found. Try another search.</p>';
        return;
    }

    jobsContainer.innerHTML = list.map(job => `
        <div class="opportunity-card">
            <h3>${job.title}</h3>
            <p class="company-name">${job.company}</p>
            <div class="opportunity-meta">
                <span>${job.location}</span>
                <span>${job.salary}</span>
                <span>${job.duration}</span>
            </div>
            <p>${job.description}</p>
            <button class="btn-primary apply-btn"
                onclick="applyForOpportunity(${job.id})">
                Apply Now
            </button>
        </div>
    `).join("");
}

function applyForOpportunity(id) {
    const user = getCurrentUser();

    if (!user) {
        alert("Please login before applying.");
        window.location.href = "login.html";
        return;
    }

    const job = opportunities.find(item => item.id === id);

    if (!job) return;

    saveApplication({
        opportunityId: job.id,
        title: job.title,
        company: job.company,
        type: job.type,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    });
}

function filterJobs() {
    const search = document.getElementById("jobSearch").value.toLowerCase();
    const category = document.getElementById("jobCategory").value;

    const filtered = opportunities.filter(job =>
        job.type === "Job" &&
        (job.title.toLowerCase().includes(search) ||
         job.company.toLowerCase().includes(search)) &&
        (!category || job.category === category)
    );

    displayJobs(filtered);
}

if (jobsContainer) {
    displayJobs(opportunities.filter(job => job.type === "Job"));

    document.getElementById("searchJobs")
        .addEventListener("click", filterJobs);

    document.getElementById("jobSearch")
        .addEventListener("input", filterJobs);

    document.getElementById("jobCategory")
        .addEventListener("change", filterJobs);
}