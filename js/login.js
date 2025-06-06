function login(event) {
  event.preventDefault();
  const inputId = document.getElementById("loginId").value;
  const inputPw = document.getElementById("loginPw").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const matchedUser = users.find(user => user.id === inputId && user.pw === inputPw);

  if (matchedUser) {
    alert("로그인 성공!");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    window.location.href = "../index.html";
  } else {
    alert("아이디 또는 비밀번호가 잘못되었습니다.");
  }
}