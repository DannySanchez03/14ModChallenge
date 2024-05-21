const deletePost = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/posts/${deletePostBtn.dataset.typeid}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post.");
  }
};

const deletePostBtn = document.querySelector("#delete-post");
// console.log("this is on line 46",deletePostBtn)

deletePostBtn.addEventListener("click", deletePost);