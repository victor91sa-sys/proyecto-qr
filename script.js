const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";

const businesses = {
  "taqueria-sol": {
    name: "Taquería Sol",
    googleMapsUrl: "https://g.page/r/TU-LINK-TAQUERIA/review",
    destinationEmail: "gerencia@taqueriasol.com"
  },
  "cafe-luna": {
    name: "Café Luna",
    googleMapsUrl: "https://g.page/r/TU-LINK-CAFE/review",
    destinationEmail: "contacto@cafeluna.com"
  },
  "barber-mx": {
    name: "Barber MX",
    googleMapsUrl: "https://g.page/r/TU-LINK-BARBER/review",
    destinationEmail: "recepcion@barbermx.com"
  }
};

let selectedRating = 0;
let currentBusiness = null;
let currentBusinessKey = null;

const stars = document.querySelectorAll(".star");
const selectedRatingText = document.getElementById("selected-rating");
const feedbackSection = document.getElementById("feedback-section");
const sendBtn = document.getElementById("send-btn");
const message = document.getElementById("message");
const businessName = document.getElementById("business-name");

const commentInput = document.getElementById("comment");
const phoneInput = document.getElementById("phone");
const consentInput = document.getElementById("contact-consent");

(function init() {
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });

  loadBusinessFromUrl();
  attachEvents();
})();

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

function loadBusinessFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const businessKey = params.get("negocio");

  if (!businessKey || !businesses[businessKey]) {
    businessName.textContent = "Negocio no encontrado";
    selectedRatingText.textContent = "Revisa el enlace del QR.";
    document.getElementById("stars").classList.add("hidden");
    return;
  }

  currentBusinessKey = businessKey;
  currentBusiness = businesses[businessKey];
  businessName.textContent = currentBusiness.name;
}

function setRating(value) {
  if (!currentBusiness) return;

  selectedRating = value;
  paintStars(value);

  message.textContent = "";
  feedbackSection.classList.add("hidden");

  if (value === 5) {
    selectedRatingText.textContent = "¡Gracias! Redirigiendo a la reseña...";
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
  if (!currentBusiness) {
    message.textContent = "No se encontró la configuración del negocio.";
    return;
  }

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
    business_name: currentBusiness.name,
    business_key: currentBusinessKey,
    destination_email: currentBusiness.destinationEmail,
    rating: selectedRating,
    comment: comment,
    phone: phone || "No proporcionado",
    consent_to_contact: consent ? "Sí" : "No",
    created_at: new Date().toLocaleString("es-MX")
  };

  sendBtn.disabled = true;
  sendBtn.textContent = "Enviando...";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, feedbackData)
    .then(() => {
      message.textContent = "Gracias. Tu comentario fue enviado.";
      clearForm();
    })
    .catch((error) => {
      console.error("Error al enviar correo:", error);
      message.textContent = "Hubo un error al enviar. Intenta de nuevo.";
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Enviar comentario";
    });
}

function clearForm() {
  commentInput.value = "";
  phoneInput.value = "";
  consentInput.checked = false;
  selectedRating = 0;
  paintStars(0);
  feedbackSection.classList.add("hidden");
  selectedRatingText.textContent = "Selecciona una calificación";
}