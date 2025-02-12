document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("phone_number", document.getElementById("phone_number").value);
    formData.append("password", document.getElementById("password").value);

    try {
        let response = await fetch("https://asadbek6035.pythonanywhere.com/account/login/", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        console.log("API dan kelgan to'liq javob:", result);

        if (response.ok) {
            let token = result.data.token.access;
            console.log("Token:", token);

            if (token) {
                localStorage.setItem("token", token); 
                alert("Tizimga muvaffaqiyatli kirdingiz!");
                window.location.href = "blogs.html";
            } else {
                alert("Token olinmadi! API javobini tekshiring.");
            }
        } else {
            alert(result.message || "Login xatoligi!");
        }
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Server bilan bog‘lanishda xatolik!");
    }
});
