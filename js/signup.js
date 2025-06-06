let isIdAvailable = false;

function checkId() {
    const inputId = document.getElementById("regId").value.trim();
    const savedId = localStorage.getItem("userId");

    if (!inputId) {
        document.getElementById("idCheckMsg").innerText = "아이디를 입력하세요.";
        isIdAvailable = false;
      } else if (inputId === savedId) {
        document.getElementById("idCheckMsg").innerText = "이미 사용 중인 아이디입니다.";
        isIdAvailable = false;
      } else {
        document.getElementById("idCheckMsg").innerText = "사용 가능한 아이디입니다.";
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

    if (!isIdAvailable) {
        alert("아이디 중복 확인을 해주세요.");
        return;
      }

      if (pw !== pwConfirm) {
        document.getElementById("pwCheckMsg").innerText = "비밀번호가 일치하지 않습니다.";
        return;
      } else {
        document.getElementById("pwCheckMsg").innerText = "";
      }

      localStorage.setItem("userId", id);
      localStorage.setItem("userPw", pw);
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone); // 공백 및 하이픈 제거 후 저장

      alert("회원가입이 완료되었습니다.");
      window.location.href = "login.html";
    }