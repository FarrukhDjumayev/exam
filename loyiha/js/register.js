document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("full_name", document.getElementById("full_name").value);
    formData.append("phone_number", document.getElementById("phone_number").value);
    formData.append("password", document.getElementById("password").value);
    formData.append("password2", document.getElementById("password2").value);
    formData.append("avatar", document.getElementById("avatar").files[0]);

    try {
        let response = await fetch("https://asadbek6035.pythonanywhere.com/account/register/", {
            method: "POST",
            body: formData
        });

        let result = await response.json();

        if (response.ok) {
            alert("Ro‘yxatdan o‘tish muvaffaqiyatli! Kirish sahifasiga yo‘naltirilmoqdasiz...");
            window.location.href = "login.html";
        } else {
            alert(result.message || "Xatolik yuz berdi!");
        }
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Server bilan bog‘lanishda xatolik!");
    }
});
