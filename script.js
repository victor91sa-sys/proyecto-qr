function rate(value) {
  if (value >= 4) {
    window.location.href = "https://www.google.com"; // luego cambiamos esto
  } else {
    document.getElementById("form").classList.remove("hidden");
  }
}

function sendFeedback() {
  const comment = document.getElementById("comment").value;

  alert("Gracias por tu comentario:\n" + comment);

  // aquí luego conectamos correo
}