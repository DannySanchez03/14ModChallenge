const editPost = async (event) => {
  event.preventDefault();
  const postId = document.querySelector("#postId").value;
  const title = document.querySelector("#update-title").value.trim();
  const content = document.querySelector("#update-post").value.trim();
  if (title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to edit post.");
    }
  }
};

const editPostBtn = document.querySelector("#update-post-form");

editPostBtn.addEventListener("submit", editPost);