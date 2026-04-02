function rate(value) {
  if (value >= 4) {
    window.location.href = "https://www.google.com";
  } else {
    document.getElementById("form").classList.remove("hidden");
  }
}

function sendFeedback() {
  const comment = document.getElementById("comment").value;

  emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
    message: comment
  }).then(() => {
    alert("Comentario enviado");
  });
}