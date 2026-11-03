function updateApplicationStatus(id, newStatus) {
    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    const index = applications.findIndex(
        app => app.opportunityId === Number(id)
    );

    if (index === -1) return;

    applications[index].status = newStatus;

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    location.reload();
}

function removeApplication(id) {
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    applications = applications.filter(
        app => app.opportunityId !== Number(id)
    );

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    location.reload();
}