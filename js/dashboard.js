document.addEventListener("DOMContentLoaded", function() {

    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    const total = applications.length;

    const pending = applications.filter(
        app => app.status === "Pending"
    ).length;

    const accepted = applications.filter(
        app => app.status === "Accepted"
    ).length;

    document.getElementById("totalApplications").textContent = total;
    document.getElementById("pendingApplications").textContent = pending;
    document.getElementById("acceptedApplications").textContent = accepted;

    const list = document.getElementById("applicationList");

    if (applications.length === 0) {
        list.innerHTML = "<p>No applications yet. Start exploring jobs!</p>";
        return;
    }

    list.innerHTML = applications.map(app => `
        <div class="application-item">
            <div>
                <h3>${app.title}</h3>
                <p>${app.company}</p>
                <small>Applied: ${app.date}</small>
            </div>
            <span class="status">${app.status}</span>
        </div>
        
    `).join("");
});