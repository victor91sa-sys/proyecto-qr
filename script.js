// PEGA AQUÍ EL LINK DIRECTO AL PERFIL/RESEÑA DEL NEGOCIO EN GOOGLE MAPS
const GOOGLE_MAPS_URL = "https://g.page/r/TU-LINK-AQUI/review";

let selectedRating = 0;

const stars = document.querySelectorAll(".star");
const selectedRatingText = document.getElementById("selected-rating");
const feedbackSection = document.getElementById("feedback-section");
const sendBtn = document.getElementById("send-btn");
const message = document.getElementById("message");

const commentInput = document.getElementById("comment");
const phoneInput = document.getElementById("phone");
const consentInput = document.getElementById("contact-consent");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = Number(star.dataset.value);
    setRating(value);
  });
});

sendBtn.addEventListener("click", sendFeedback);

function setRating(value) {
  selectedRating = value;
  paintStars(value);
  message.textContent = "";
  feedbackSection.classList.add("hidden");

  selectedRatingText.textContent = `Calificación seleccionada: ${value} de 5`;

  if (value === 5) {
    selectedRatingText.textContent = "¡Gracias! Redirigiendo...";
    setTimeout(() => {
      window.location.href = GOOGLE_MAPS_URL;
    }, 800);
  } else {
    feedbackSection.classList.remove("hidden");
  }
}

function paintStars(value) {
  stars.forEach((star) => {
    const starValue = Number(star.dataset.value);
    star.textContent = starValue <= value ? "★" : "☆";
  });
}

function sendFeedback() {
  const comment = commentInput.value.trim();
  const phone = phoneInput.value.trim();
  const consent = consentInput.checked;

  if (selectedRating === 0) {
    message.textContent = "Primero selecciona una calificación.";
    return;
  }

  if (selectedRating <= 4 && comment === "") {
    message.textContent = "Por favor escribe un comentario.";
    return;
  }

  const feedbackData = {
    rating: selectedRating,
    comment: comment,
    phone: phone,
    consentToContact: consent,
    createdAt: new Date().toISOString(),
  };

  console.log("Feedback enviado:", feedbackData);

  message.textContent = "Gracias. Tu comentario fue enviado.";

  commentInput.value = "";
  phoneInput.value = "";
  consentInput.checked = false;
}