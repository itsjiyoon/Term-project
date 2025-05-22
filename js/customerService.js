document.getElementById("phone").addEventListener("input", function (e) {
  let num = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

  if (num.length > 7) { // Format as 000-0000-0000
    num = num.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  } 

  else if (num.length > 3) { // Format as 000-0000
    num = num.replace(/(\d{3})(\d+)/, '$1-$2');
  }

  e.target.value = num;
});

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault(); // 제출로 인한 새로고침 방지

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const content = document.getElementById("content").value.trim();
    const isChecked = document.getElementById("check").checked;

    if (name === "" || phone === "" || content === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    } 
    
    else if (!isChecked) {
      alert("개인정보처리방침에 동의해주세요.");
      return;
    } 
    
    alert("접수 되었습니다!");
    location.reload();
  });

window.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('#prof img');
    if (!img) return;

    setTimeout(function() {
        img.style.animation = 'none';
    }, 4000);
});
