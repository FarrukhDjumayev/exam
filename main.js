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
         <div data-aos="fade-up" data-aos-duration="1000"
    class="bg-transparent p-6 sm:p-8 md:p-10 rounded-lg shadow-lg max-w-lg w-full mx-auto border border-green-500 dark:border-gray-700 backdrop-blur-lg">
    
    <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-700 dark:text-gray-200">
      Ro‘yxatdan o‘tish
    </h2>

    <input type="text" id="full_name" placeholder="Ism"
      class="w-full bg-gray-500/40 backdrop-blur-md text-gray-700 px-4 py-3 border border-green-600 rounded-3xl cursor-pointer hover:bg-gray-800/30 transition mb-3"
      data-aos="fade-right" data-aos-duration="1000">

    <input type="text" id="login_phone_number" placeholder="Telefon raqam"
      class="w-full bg-gray-500/40 backdrop-blur-md text-gray-700 px-4 py-3 border border-green-600 rounded-3xl cursor-pointer hover:bg-gray-800/30 transition mb-3"
      data-aos="fade-left" data-aos-duration="1000">

    <div class="password-container relative" data-aos="fade-right" data-aos-duration="1000">
      <input type="password" id="login_password" placeholder="Parol"
        class="w-full bg-gray-500/40 backdrop-blur-md text-gray-700 px-4 py-3 border border-green-600 rounded-3xl cursor-pointer hover:bg-gray-800/30 transition mb-3 pr-10">
      <i class="fa-solid fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        id="togglePassword"></i>
    </div>

    <div class="password-container relative" data-aos="fade-left" data-aos-duration="1000">
      <input type="password" id="password2" placeholder="Parolni tasdiqlash"
        class="w-full bg-gray-500/40 backdrop-blur-md text-gray-700 px-4 py-3 border border-green-600 rounded-3xl cursor-pointer hover:bg-gray-800/30 transition mb-3 pr-10">
      <i class="fa-solid fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        id="togglePassword2"></i>
    </div>

    <label for="avatar"
      class="flex items-center justify-center w-full bg-gray-500/40 gap-4 backdrop-blur-md text-black px-4 py-3 border border-green-600 rounded-3xl cursor-pointer hover:bg-gray-800/30 transition mb-3"
      data-aos="zoom-in" data-aos-duration="800">
      <i class="fa-solid fa-image"></i> Avatar yuklash
    </label>
    <input type="file" id="avatar" class="hidden">

    <button id="register-btn"
      class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      data-aos="zoom-in" data-aos-duration="800">
      Ro‘yxatdan o‘tish
    </button>
    <p class="flex items-center justify-center gap-2 text-sm md:text-base mt-3 !text-gray-900 !dark:text-gray-300" data-aos="fade-up" data-aos-duration="800">
      Allaqachon hisobingiz bormi? 
      <a href="#" id="login-link" class="border-2 border-green-500 p-2 text-green-400 hover:underline inline-block">
        Tizimga kirish
      </a>
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
        <div data-aos="fade-up" data-aos-duration="1000"
    class="bg-transparent p-8 rounded-lg shadow-md max-w-md mx-auto border border-gray-300 dark:border-gray-700 backdrop-blur-lg">
    
    <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Tizimga kirish</h2>
    
    <input type="text" id="login_phone_number" placeholder="Telefon raqam"
      class="bg-transparent w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-3"
      data-aos="fade-right" data-aos-duration="1000" />

    <input type="password" id="login_password" placeholder="Parol"
      class="bg-transparent w-full px-4 py-2 border border-green-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
      data-aos="fade-left" data-aos-duration="1000" />

    <button id="login-btn"
      class="w-full bg-green-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md transition duration-300"
      data-aos="zoom-in" data-aos-duration="800">
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
      content.innerHTML = `<p class="text-gray-500">Yuklanmoqda...</p>`;

      let blogs = await fetchData(
        "https://asadbek6035.pythonanywhere.com/blog/list/"
      );

      if (!blogs || blogs.length === 0) {
        content.innerHTML = `<p class="text-gray-500">Hozircha bloglar mavjud emas.</p>`;
        return;
      }

      content.innerHTML = `<h2 class="text-2xl mb-4" data-aos="flip-right">Bloglar</h2>`;

      blogs.forEach((blog) => {
        let div = document.createElement("div");
        div.className =
          "p-4 border bg-[#15E1E6] rounded mb-2 cursor-pointer hover:bg-gray-100";
        div.setAttribute("data-aos", "flip-right");
        div.setAttribute("data-aos-duration", "1000");

        div.innerHTML = `<h3 class="font-semibold">${blog.title}</h3><p class="text-gray-700">${blog.description}</p>`;
        div.addEventListener("click", () => loadBlogDetails(blog.id));
        content.appendChild(div);
      });

      AOS.refresh();
    } catch (error) {
      console.error("Bloglarni yuklashda xatolik:", error);
      content.innerHTML = `<p class="text-red-500">Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.</p>`;
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
