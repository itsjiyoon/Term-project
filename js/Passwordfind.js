function findPw(event) {
  event.preventDefault();
  const inputId = document.getElementById("userId").value.trim();
  const rawPhone = document.getElementById("phone").value;
  const inputPhone = rawPhone.replace(/[\s-]/g, ""); // <- 여기 추가됨

  const savedId = localStorage.getItem("userId");
  const savedPhone = localStorage.getItem("userPhone").replace(/[\s-]/g, ""); // 비교 대상도 정리

  const savedPw = localStorage.getItem("userPw");
  const resultDiv = document.getElementById("result");

  if (inputId === savedId && inputPhone === savedPhone) {
    resultDiv.innerText = `회원님의 비밀번호는 "${savedPw}"입니다.`;
  } else {
    resultDiv.innerText = `입력한 정보와 일치하는 계정이 없습니다.`;
  }
}