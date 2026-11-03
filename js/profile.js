document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("profileForm");
    if (!form) return;

    const user = getCurrentUser() || {};

    const savedProfile =
        JSON.parse(localStorage.getItem("userProfile")) || {};

    const nameInput = document.getElementById("profileInputName");
    const emailInput = document.getElementById("profileInputEmail");
    const educationInput = document.getElementById("profileEducation");
    const skillsInput = document.getElementById("profileSkills");
    const aboutInput = document.getElementById("profileAbout");

    nameInput.value = savedProfile.name || user.name || "";
    emailInput.value = savedProfile.email || user.email || "";
    educationInput.value = savedProfile.education || user.education || "";
    skillsInput.value = savedProfile.skills || "";
    aboutInput.value = savedProfile.about || "";

    document.getElementById("profileName").textContent = nameInput.value || "Your Name";
    document.getElementById("profileEmail").textContent = emailInput.value || "your@email.com";

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const profile = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            education: educationInput.value.trim(),
            skills: skillsInput.value.trim(),
            about: aboutInput.value.trim()
        };

        localStorage.setItem("userProfile", JSON.stringify(profile));

        document.getElementById("profileName").textContent = profile.name;
        document.getElementById("profileEmail").textContent = profile.email;

        document.getElementById("profileMessage").textContent =
            "Profile saved successfully!";
    });
});