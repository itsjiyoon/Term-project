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
