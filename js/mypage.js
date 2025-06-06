const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("userName").textContent = currentUser?.name || "정보 없음";
document.getElementById("userPhone").textContent = currentUser?.phone || "정보 없음";
document.getElementById("userId").textContent = currentUser?.id || "정보 없음";


function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}