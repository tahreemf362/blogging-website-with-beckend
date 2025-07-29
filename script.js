document.addEventListener("DOMContentLoaded", function () {
  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/login";

      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "email";
      emailInput.value = email;

      const passwordInput = document.createElement("input");
      passwordInput.type = "hidden";
      passwordInput.name = "password";
      passwordInput.value = password;

      form.appendChild(emailInput);
      form.appendChild(passwordInput);
      document.body.appendChild(form);
      form.submit();
    });
  }

  // SIGNUP
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const confirm = document.getElementById("signupConfirmPassword").value.trim();

      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/signup";

      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "email";
      emailInput.value = email;

      const passwordInput = document.createElement("input");
      passwordInput.type = "hidden";
      passwordInput.name = "password";
      passwordInput.value = password;

      form.appendChild(emailInput);
      form.appendChild(passwordInput);
      document.body.appendChild(form);
      form.submit();
    });
  }

  // DASHBOARD WELCOME TEXT (optional)
  const welcomeBox = document.getElementById("welcome");
  if (welcomeBox) {
    fetch("/dashboard.html")
      .then(() => {
        welcomeBox.textContent = "Welcome to your Dashboard!";
      })
      .catch(() => {
        alert("Please login first.");
        window.location.href = "/";
      });
  }
});
