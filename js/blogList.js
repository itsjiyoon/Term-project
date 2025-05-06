
function toUTF(searchKeyword) {
  return encodeURIComponent(searchKeyword);
}

document.getElementById("search-button").addEventListener("click", async function() {
  const searchKeyword = document.getElementById("search-input").value;

  if (searchKeyword.trim() === "") {
    alert("검색어를 입력하세요.");
    return;
  }

  const encodedKeyword = toUTF(searchKeyword);
  const url = `http://localhost:3000/search?query=${encodedKeyword}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API 연결 오류");
    }

    const data = await response.json();
    const postList = data.items.map(item => ({
      title: item.title,
      link: item.link
    }));

    displayPosts(postList);
  } catch (error) {
    console.error("에러 발생:", error);
  }
});

function displayPosts(postList) {
  const postListElement = document.getElementById("post-list");
  postListElement.innerHTML = ""; 

  postList.forEach(post => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${post.link}" target="_blank">${post.title}</a>`;
    postListElement.appendChild(li);
  });
}