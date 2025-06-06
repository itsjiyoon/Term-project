function findId(event) {
      event.preventDefault();
      const inputName = document.getElementById("name").value.trim();
      const rawPhone = document.getElementById("phone").value;
      const inputPhone = rawPhone.replace(/[\s-]/g, "");  // 공백, 하이픈 제거

      const savedName = localStorage.getItem("userName");
      const savedPhone = (localStorage.getItem("userPhone") || "").replace(/[\s-]/g, "");
      const savedId = localStorage.getItem("userId");

      const resultDiv = document.getElementById("result");

      if (inputName === savedName && inputPhone === savedPhone) {
        resultDiv.innerText = `회원님의 아이디는 "${savedId}"입니다.`;
      } else {
        resultDiv.innerText = `입력한 정보와 일치하는 아이디가 없습니다.`;
      }
    }