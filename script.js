// =====================================
// CONFIGURACIÓN DE EMAILJS
// REEMPLAZA ESTOS 3 VALORES CON LOS TUYOS
// =====================================
const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";

// =====================================
// NEGOCIOS DE PRUEBA
// =====================================
const businesses = {
  "la-sirloneria": {
    name: "La Sirlonería",
    googleMapsUrl: "https://maps.app.goo.gl/gunvepxTKWpFhvyi6",
    destinationEmail: "victor91sa@gmail.com"
  },
  "tacos-de-sonora": {
    name: "Tacos de sonora",
    googleMapsUrl: "https://maps.app.goo.gl/UXwYr11o3zCDL34H8",
    destinationEmail: "victor91sa@gmail.com"
  },
  "fer-barber-shop-cholula": {
    name: "Fer Barber Shop Cholula 💈",
    googleMapsUrl: "https://maps.app.goo.gl/3Hb7GfvzpixzVLtM8",
    destinationEmail: "victor91sa@gmail.com"
  }
};

let selectedRating = 0;
let currentBusiness = null;
let currentBusinessKey = null;

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
  if (window.emailjs) {
    window.emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });
  }

  loadBusinessFromUrl();
  attachEvents();
}

function loadBusinessFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const businessKey = params.get("negocio");

  if (businessKey && businesses[businessKey]) {
    currentBusinessKey = businessKey;
    currentBusiness = businesses[businessKey];
  } else {
    currentBusinessKey = "la-sirloneria";
    currentBusiness = businesses["la-sirloneria"];
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
  clearMessage();
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

function clearMessage() {
  message.textContent = "";
  message.classList.remove("error");
}

function showError(text) {
  message.textContent = text;
  message.classList.add("error");
}

function showSuccess(text) {
  message.textContent = text;
  message.classList.remove("error");
}

function sendFeedback() {
  const comment = commentInput.value.trim();
  const phone = phoneInput.value.trim();
  const consent = consentInput.checked;

  clearMessage();

  if (selectedRating === 0) {
    showError("Primero selecciona una calificación.");
    return;
  }

  if (selectedRating <= 4 && comment === "") {
    showError("Por favor escribe un comentario.");
    return;
  }

  if (!window.emailjs) {
    showError("EmailJS no cargó correctamente.");
    return;
  }

  const templateParams = {
    business_name: currentBusiness.name,
    business_slug: currentBusinessKey,
    destination_email: currentBusiness.destinationEmail,
    rating: selectedRating,
    comment: comment || "Sin comentario",
    phone: phone || "No proporcionado",
    consent_to_contact: consent ? "Sí" : "No",
    created_at: new Date().toLocaleString("es-MX")
  };

  sendBtn.disabled = true;
  sendBtn.textContent = "Enviando...";

  window.emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showSuccess("Gracias. Tu comentario fue enviado.");
      resetForm();
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      showError("Hubo un error al enviar el comentario.");
    })
    .finally(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Enviar comentario";
    });
}

function resetForm() {
  commentInput.value = "";
  phoneInput.value = "";
  consentInput.checked = false;
  feedbackSection.classList.add("hidden");
  selectedRating = 0;
  paintStars(0);
  selectedRatingText.textContent = "Selecciona una calificación";
}