const API_URL = "http://localhost:5000/api";

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

function showAuthMessage(message, success = false) {
    const element = document.getElementById("authMessage");

    if (element) {
        element.textContent = message;
        element.style.color = success ? "green" : "red";
    }
}

// Signup
if (signupForm) {
    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const user = {
            name: document.getElementById("signupName").value.trim(),
            email: document.getElementById("signupEmail").value.trim(),
            password: document.getElementById("signupPassword").value,
            education: document.getElementById("signupEducation").value
        };

        if (user.password.length < 6) {
            showAuthMessage("Password must contain at least 6 characters.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            showAuthMessage("Account created successfully! Please login.", true);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } catch (error) {
            showAuthMessage(error.message);
        }
    });
}

// Login
if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const credentials = {
            email: document.getElementById("loginEmail").value.trim(),
            password: document.getElementById("loginPassword").value
        };

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            const user = data.user || data;
            localStorage.setItem("currentUser", JSON.stringify(user));

            showAuthMessage("Login successful!", true);

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } catch (error) {
            showAuthMessage(error.message);
        }
    });
}