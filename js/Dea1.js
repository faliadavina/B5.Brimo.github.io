const inputs = document.querySelectorAll(".input");
const maxAttempts = 3;
let remainingAttempts = maxAttempts;

function addcl(){
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl(){
  let parent = this.parentNode.parentNode;
  if(this.value == ""){
    parent.classList.remove("focus");
  }
}

function validate(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if(username === "" || password === ""){
    document.querySelector(".warning-message").style.display = "block";
    document.querySelector(".error-message").style.display = "none";
    setTimeout(() => {
      document.querySelector(".warning-message").style.display = "none";
    }, 4000);
  } else if (username !== "admin" || password !== "1234"){
    remainingAttempts--;
    if (remainingAttempts > 0) {
      document.querySelector(".error-message").style.display = "block";
      document.querySelector(".warning-message").style.display = "none";
      document.querySelector(".error-message").textContent = `PIN yang Anda masukkan salah!\nSisa percobaan: ${remainingAttempts}`;
      setTimeout(() => {
        document.querySelector(".error-message").style.display = "none";
      }, 4000);
    } else {
      document.querySelector(".error-message").textContent = `Anda sudah mencoba ${maxAttempts} kali. Akun anda Terblokir.`;
      document.querySelector(".error-message").style.display = "block";
      document.querySelector(".warning-message").style.display = "none";
      document.getElementById("submit").disabled = true; // disable tombol submit
      setTimeout(() => {
        document.querySelector(".error-message").style.display = "none";
      }, 4000);
      setTimeout(() => {
        document.getElementById("submit").disabled = false; // enable tombol submit
        remainingAttempts = maxAttempts; // reset sisa percobaan
        document.querySelector(".error-message").style.display = "none";
      }, 30000); // tunggu 30 detik sebelum mengaktifkan tombol submit dan mereset sisa percobaan
    }
  } else {
    document.querySelector(".error-message").style.display = "none";
    document.querySelector(".warning-message").style.display = "none";
    // alert("Login berhasil!");
    window.location.replace("ainiD_HalamanUtama.html");
  }
}

inputs.forEach(input => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

document.getElementById("submit").addEventListener("click", validate);
