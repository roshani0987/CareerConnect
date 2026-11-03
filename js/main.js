function toggleMenu() {
    const menu = document.getElementById("navMenu");

    if (menu) {
        menu.classList.toggle("active");
    }
}

// Get logged-in user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// Get all applications
function getApplications() {
    return JSON.parse(localStorage.getItem("applications")) || [];
}

// Save application
function saveApplication(application) {
    const applications = getApplications();

    const exists = applications.some(
        item => item.opportunityId === application.opportunityId
    );

    if (exists) {
        alert("You have already applied for this opportunity!");
        return;
    }

    applications.push(application);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    alert("Application submitted successfully!");
}