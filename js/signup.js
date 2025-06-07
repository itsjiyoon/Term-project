let isIdAvailable = false;

function getUsersFromStorage() {
  try {
    const data = JSON.parse(localStorage.getItem("users"));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function checkId() {
  const inputId = document.getElementById("regId").value.trim();
  const users = getUsersFromStorage();

  const msg = document.getElementById("idCheckMsg");

  if (!inputId) {
    msg.innerText = "아이디를 입력하세요.";
    isIdAvailable = false;
    return;
  }

  const isDuplicate = users.some(user => user.id === inputId);

  if (isDuplicate) {
    msg.innerText = "이미 사용 중인 아이디입니다.";
    isIdAvailable = false;
  } else {
    msg.innerText = "사용 가능한 아이디입니다.";
    isIdAvailable = true;
  }
}

function register(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim().replace(/[\s-]/g, "");
  const id = document.getElementById("regId").value.trim();
  const pw = document.getElementById("regPw").value;
  const pwConfirm = document.getElementById("regPwConfirm").value;
  const pwMsg = document.getElementById("pwCheckMsg");

  if (!isIdAvailable) {
    alert("아이디 중복 확인을 해주세요.");
    return;
  }

  if (pw !== pwConfirm) {
    pwMsg.innerText = "비밀번호가 일치하지 않습니다.";
    return;
  } else {
    pwMsg.innerText = "";
  }

  const users = getUsersFromStorage();
  users.push({
    id: id,
    pw: pw,
    name: name,
    phone: phone
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("회원가입이 완료되었습니다.");
  window.location.href = "login.html";
}
