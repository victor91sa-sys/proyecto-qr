const businesses = {
  "taqueria-sol": {
    name: "Taquería Sol",
    googleMapsUrl: "https://g.page/r/TU-LINK-TAQUERIA/review"
  },
  "cafe-luna": {
    name: "Café Luna",
    googleMapsUrl: "https://g.page/r/TU-LINK-CAFE/review"
  },
  "barber-mx": {
    name: "Barber MX",
    googleMapsUrl: "https://g.page/r/TU-LINK-BARBER/review"
  }
};

let selectedRating = 0;
let currentBusiness = null;

const stars = document.querySelectorAll(".star");
const businessName = document.getElementById("business-name");
const selectedRatingText = document.getElementById("selected-rating");
const feedbackSection = document.getElementById("feedback-section");
const commentInput = document.getElementById("comment");
const phoneInput = document.getElementById("phone");
const consentInput = document.getElementById("contact-consent");
const sendBtn = document.getElementById("send-btn");
const message = document.getElementById("message");

init();

function init() {
  loadBusinessFromUrl();
  attachEvents();
}

function loadBusinessFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const businessKey = params.get("negocio");

  if (businessKey && businesses[businessKey]) {
    currentBusiness = businesses[businessKey];
  } else {
    currentBusiness = businesses["taqueria-sol"];
  }

  businessName.textContent = currentBusiness.name;
}

function attachEvents() {
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = Number(star.dataset.value);
      setRating(value);
    });

    star.addEventListener("mouseenter", () => {
      const value = Number(star.dataset.value);
      previewStars(value);
    });

    star.addEventListener("mouseleave", () => {
      paintStars(selectedRating);
    });
  });

  sendBtn.addEventListener("click", sendFeedback);
}

function setRating(value) {
  selectedRating = value;
  paintStars(value);
  message.textContent = "";
  feedbackSection.classList.add("hidden");

  if (value === 5) {
    selectedRatingText.textContent = "¡Gracias! Redirigiendo...";
    setTimeout(() => {
      window.location.href = currentBusiness.googleMapsUrl;
    }, 700);
  } else {
    selectedRatingText.textContent = `${value} de 5 estrellas`;
    feedbackSection.classList.remove("hidden");
  }
}

function previewStars(value) {
  stars.forEach((star) => {
    const starValue = Number(star.dataset.value);
    star.classList.toggle("active", starValue <= value);
  });
}

function paintStars(value) {
  stars.forEach((star) => {
    const starValue = Number(star.dataset.value);
    star.classList.toggle("active", starValue <= value);
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
    business: currentBusiness.name,
    rating: selectedRating,
    comment: comment,
    phone: phone,
    consentToContact: consent,
    createdAt: new Date().toISOString()
  };

  console.log("Feedback capturado:", feedbackData);

  message.textContent = "Gracias. Tu comentario fue enviado.";
  commentInput.value = "";
  phoneInput.value = "";
  consentInput.checked = false;
  feedbackSection.classList.add("hidden");
  selectedRating = 0;
  paintStars(0);
  selectedRatingText.textContent = "Selecciona una calificación";
}