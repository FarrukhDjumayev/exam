document.addEventListener("DOMContentLoaded", function () {
    let content = document.getElementById("content");
  
    document
      .getElementById("toggle-theme")
      .addEventListener("click", function () {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
          this.innerText = "☀️ Light Mode";
        } else {
          this.innerText = "🌙 Dark Mode";
        }
      });
  
    function fetchData(url, options = {}) {
      return fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Xatolik:", error);
          alert(`Xatolik: ${error.message}`);
        });
    }
  
    function loadRegisterPage() {
      content.innerHTML = `
        <div class="bg-transparent p-8 rounded-lg shadow-md max-w-md mx-auto border border-green-500 dark:border-gray-700 backdrop-blur-lg">
          <h2 class="bg-transparent text-2xl font-bold text-center mb-4 text-gray-700 dark:text-gray-200">Ro‘yxatdan o‘tish</h2>
          <input type="text" id="full_name" placeholder="Ism" class="bg-transparent w-full px-4 py-2 mb-3 border rounded-lg focus:ring focus:ring-green-500 dark:bg-gray-700 dark:text-white">
          <input type="text" id="login_phone_number" placeholder="Telefon raqam" class="bg-transparent w-full px-4 py-2 mb-3 border rounded-lg focus:ring focus:ring-green-500 dark:bg-gray-700 dark:text-white">
          <input type="password" id="login_password" placeholder="Parol" class="bg-transparent w-full px-4 py-2 mb-3 border rounded-lg focus:ring focus:ring-green-500 dark:bg-gray-700 dark:text-white">
          <input type="password" id="password2" placeholder="Parolni tasdiqlash" class=" bg-transparent w-full px-4 py-2 mb-3 border rounded-lg focus:ring focus:ring-green-500 dark:bg-gray-700 dark:text-white">
          <input type="file" id="avatar" class="w-full px-4 py-2 mb-4 bg-transparent border rounded-lg dark:bg-gray-700 dark:text-white">
          <button id="register-btn" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-600 transition">Ro‘yxatdan o‘tish</button>
          <p class="text-center mt-3 text-gray-600 dark:text-gray-700">Allaqachon hisobingiz bormi? 
            <a href="#" id="login-link" class="border-2 border-green-500 p-2 text-green-500 hover:underline">Tizimga kirish</a>
          </p>
        </div>
      `;
  
      document
        .getElementById("register-btn")
        .addEventListener("click", function () {
          let data = new FormData();
          data.append("full_name", document.getElementById("full_name").value);
          data.append(
            "phone_number",
            document.getElementById("login_phone_number").value
          );
          data.append(
            "password",
            document.getElementById("login_password").value
          );
          data.append("password2", document.getElementById("password2").value);
          data.append("avatar", document.getElementById("avatar").files[0]);
  
          let passwordField = document.getElementById("login_password");
          let passwordConfirmField = document.getElementById("password2");
  
          if (password !== password2) {
            passwordField.classList.add("border-red-500");
            passwordConfirmField.classList.add("border-red-500");
            alert("Parollar mos kelmayapti! Iltimos, tekshiring.");
            return;
          } else {
            passwordField.classList.remove("border-red-500");
            passwordConfirmField.classList.remove("border-red-500");
          }
  
          fetchData("https://asadbek6035.pythonanywhere.com/account/register/", {
            method: "POST",
            body: data,
          }).then((result) => {
            if (result) {
              alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
              loadLoginPage();
            }
          });
        });
  
      document
        .getElementById("login-link")
        .addEventListener("click", loadLoginPage);
    }
  
    function loadLoginPage() {
      content.innerHTML = `
        <div class="bg-transparent p-8 rounded-lg shadow-md max-w-md mx-auto border border-gray-300 dark:border-gray-700 backdrop-blur-lg">
          <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Tizimga kirish</h2>
          
          <input type="text" id="login_phone_number" placeholder="Telefon raqam"
            class="bg-transparent w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3" />
  
          <input type="password" id="login_password" placeholder="Parol"
            class="bg-transparent w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4" />
  
          <button id="login-btn" onclick="loadLoginPage()"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md transition duration-300">
            Kirish
          </button>
        </div>
      `;
  
      document.getElementById("login-btn").addEventListener("click", function () {
        let data = {
          phone_number: document.getElementById("login_phone_number").value,
          password: document.getElementById("login_password").value,
        };
  
        fetchData("https://asadbek6035.pythonanywhere.com/account/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).then((result) => {
          if (result) {
            alert("Tizimga muvaffaqiyatli kirdingiz!");
            loadBlogList();
          }
        });
      });
    }
  
    async function loadBlogList() {
      try {
        let blogs = await fetchData(
          "https://asadbek6035.pythonanywhere.com/blog/list/"
        );
        if (blogs) {
          content.innerHTML = `<h2 class="text-2xl font-bold mb-4">Bloglar</h2>`;
          let blogListHTML = blogs
            .map(
              (blog) => `
              <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer mb-4"
                   onclick="loadBlogDetails(${blog.id})">
                <h3 class="text-lg font-semibold text-gray-800">${blog.title}</h3>
                <p class="text-gray-600">${blog.content}</p>
              </div>
            `
            )
            .join("");
          content.innerHTML += blogListHTML;
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    }
  
    function loadBlogDetails(blogId) {
      fetchData(
        `https://asadbek6035.pythonanywhere.com/blog/retrieve/${blogId}`
      ).then((blog) => {
        if (blog) {
          content.innerHTML = `<h2>${blog.title}</h2><p>${blog.description}</p>`;
          let backButton = document.createElement("button");
          backButton.textContent = "Ortga";
          backButton.addEventListener("click", loadBlogList);
          content.appendChild(backButton);
        }
      });
    }
    loadRegisterPage();
  });
  