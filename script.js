if (!localStorage.getItem('user')) {
  document.querySelector(".input-box").style.display = "block";
  document.querySelector(".enter-btn").style.display = "block";
} else {
  document.querySelector(".input-box").style.display = "none";
}

function logout() {
 localStorage.clear();
 window.location.reload();
}
