let token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function getUserId() {
  try {
    let response = await fetch(
      "https://asadbek6035.pythonanywhere.com/account/me/",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    let userData = await response.json();
    console.log("Foydalanuvchi ma’lumotlari:", userData);
    return userData.id;
  } catch (error) {
    console.error("Foydalanuvchi ID sini olishda xatolik:", error);
    return null;
  }
}

async function getBlogs() {
  try {
    let response = await fetch(
      "https://asadbek6035.pythonanywhere.com/blog/list/",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    let blogs = await response.json();
    let blogContainer = document.getElementById("blogs");
    blogContainer.innerHTML = "";

    blogs.forEach((blog) => {
      let blogElement = document.createElement("div");
      blogElement.classList.add(
        "backdrop-blur-xl",
        "p-4",
        "rounded-lg",
        "shadow-lg",
        "transition",
        "hover:shadow-xl"
      );
      blogElement.setAttribute("data-aos", "fade-up");

      let imageHTML = blog.image
        ? `<img src="${blog.image}" alt="Blog rasmi" class="w-full h-80 object-cover rounded-lg mb-2" data-aos="flip-right">`
        : "";

      blogElement.innerHTML = `
                ${imageHTML}
                <h3 class="text-xl font-bold">${blog.title}</h3>
                <p class="text-gray-700 mt-2">${blog.description}</p>
                <button onclick="viewBlog(${blog.id})" class="mt-3 bg-green-600 text-white px-4 py-2 rounded-base hover:bg-green-600 transition">Batafsil</button>`;

      blogContainer.appendChild(blogElement);
    });
  } catch (error) {
    console.error("Xatolik:", error);
    alert("Bloglarni yuklashda muammo");
  }
}

function viewBlog(id) {
  window.location.href = `blog-detail.html?id=${id}`;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  getBlogs();
});


async function createBlog() {
  let title = document.getElementById("blog-title").value;
  let category = document.getElementById("blog-category").value;
  let description = document.getElementById("blog-description").value;
  let image = document.getElementById("blog-image").files[0];

  if (!title || !category || !description || !image) {
    alert("Barcha maydonlarni to‘ldiring");
    return;
  }

  let formData = new FormData();
  formData.append("title", title);
  formData.append("category", parseInt(category));
  formData.append("description", description);
  formData.append("image", image);

  let token = localStorage.getItem("token");

  console.log("Yuborilayotgan ma'lumot:", {
    title,
    category,
    description,
    image,
  });

  try {
    let response = await fetch(
      "https://asadbek6035.pythonanywhere.com/blog/create/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    let result = await response.json();
    console.log("API javobi:", result);

    if (response.ok) {
      alert("Blog muvaffaqiyatli qo‘shildi");
      window.location.reload();
    } else {
      alert("Xatolik: " + JSON.stringify(result));
    }
  } catch (error) {
    console.error("Xatolik:", error);
    alert("Server bilan bog‘lanishda muammo");
  }
}

async function deleteBlog(id) {
  let confirmDelete = confirm("Haqiqatan ham ushbu blogni o‘chirmoqchimisiz?");
  if (!confirmDelete) return;

  console.log(`DELETE so‘rov yuborilmoqda: /blog/destroy/${id}/`);

  try {
    let response = await fetch(
      `https://asadbek6035.pythonanywhere.com/blog/destroy/${id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    let result = await response.text();
    console.log("API javobi:", result); 

    if (response.ok) {
      alert("Blog muvaffaqiyatli o‘chirildi");
      window.location.reload();
    } else {
      alert("Blogni o‘chirishda xatolik");
    }
  } catch (error) {
    console.error("Xatolik:", error);
    alert("Server bilan bog‘lanishda muammo");
  }
}
async function editBlog(id, title, description) {
  let newTitle = prompt("Yangi sarlavha:", title);
  let newDescription = prompt("Yangi tavsif:", description);

  if (!newTitle || !newDescription) {
    alert("Barcha maydonlarni to‘ldiring");
    return;
  }

  console.log(`PUT so‘rov yuborilmoqda: /blog/retrieve/${id}/`);

  try {
    let response = await fetch(
      `https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      }
    );

    let result = await response.json();
    console.log("API javobi:", result);

    if (response.ok) {
      alert("Blog muvaffaqiyatli yangilandi");
      window.location.reload();
    } else {
      alert("Xatolik: " + JSON.stringify(result));
    }
  } catch (error) {
    console.error("Xatolik:", error);
    alert("Server bilan bog‘lanishda muammo");
  }
}
