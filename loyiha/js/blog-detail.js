const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

let token = localStorage.getItem("token");


if (!token) {
    window.location.href = "login.html";
}

async function getBlogDetail() {
    try {
        let response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${blogId}/`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        let blog = await response.json();
        document.getElementById("blog-title").innerText = blog.title;
        document.getElementById("blog-description").innerText = blog.description;

        getComments();
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Blog tafsilotlarini yuklashda muammo!");
    }
}

async function getComments() {
    try {
        let response = await fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${blogId}`, {
            method: "GET"
        });

        let comments = await response.json();
        let commentContainer = document.getElementById("comments");
        commentContainer.innerHTML = "<h3>Komentariyalar:</h3>";

        comments.forEach(comment => {
            let commentElement = document.createElement("p");
            commentElement.innerText = comment.description;
            commentContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Kommentlarni yuklashda muammo!");
    }
}

async function addComment() {
    let commentText = document.getElementById("comment-input").value;

    if (!commentText) {
        alert("Komment matnini kiriting!");
        return;
    }

    try {
        let formData = new FormData();
        formData.append("blog", blogId);
        formData.append("description", commentText);

        let response = await fetch("https://asadbek6035.pythonanywhere.com/blog/comment/post/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert("Komment muvaffaqiyatli qo‘shildi!");
            document.getElementById("comment-input").value = ""; 
            getComments();
        } else {
            alert("Komment qo‘shishda muammo!");
        }
    } catch (error) {
        console.error("Xatolik:", error);
        alert("Server bilan bog‘lanishda xatolik!");
    }
}

getBlogDetail();
