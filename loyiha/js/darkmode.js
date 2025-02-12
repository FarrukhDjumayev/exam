document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const toggleBtn = document.getElementById("toggle-theme");

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        toggleBtn.textContent = "Light Mode";
    } else {
        body.classList.add("light");
        toggleBtn.textContent = "Dark Mode";
    }

    toggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark");
        body.classList.toggle("light");
        if (body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            toggleBtn.textContent = "Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.textContent = "Dark Mode";
        }
    });
});
