const params = new URLSearchParams(window.location.search);
const negocio = params.get("negocio");

const config = {
  taqueria: {
    nombre: "Taquería Sol",
    correo: "taqueria@gmail.com",
    google: "https://www.google.com/maps",
    logo: "logo-taqueria.png"
  },
  cafe: {
    nombre: "Cafetería Luna",
    correo: "cafe@gmail.com",
    google: "https://www.google.com/maps",
    logo: "logo-cafeteria.png"
  },
  barberia: {
    nombre: "Barbería MX",
    correo: "barberia@gmail.com",
    google: "https://www.google.com/maps",
    logo: "logo-barberia.png"
  }
};

const negocioActual = config[negocio];

const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
const form = document.getElementById("form");
const sendBtn = document.getElementById("sendBtn");
const commentInput = document.getElementById("comment");
const businessName = document.getElementById("businessName");
const logoNegocio = document.getElementById("logoNegocio");

let selectedRating = 0;

if (negocioActual) {
  businessName.textContent = `¿Cómo fue tu experiencia en ${negocioActual.nombre}?`;
  logoNegocio.src = negocioActual.logo;
  logoNegocio.style.display = "block";
} else {
  businessName.textContent = "Negocio no configurado";
  ratingText.textContent = "Usa ?negocio=taqueria";
  logoNegocio.style.display = "none";
}

function paintStars(value) {
  stars.forEach((star) => {
    const val = Number(star.dataset.value);
    if (val <= value) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function getText(value) {
  if (value === 1) return "Muy mala";
  if (value === 2) return "Mala";
  if (value === 3) return "Regular";
  if (value === 4) return "Buena";
  if (value === 5) return "Excelente";
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    if (!negocioActual) {
      alert("Usa ?negocio=taqueria");
      return;
    }

    selectedRating = Number(star.dataset.value);
    paintStars(selectedRating);
    ratingText.textContent = getText(selectedRating);

    if (selectedRating >= 4) {
      setTimeout(() => {
        window.location.href = negocioActual.google;
      }, 500);
    } else {
      form.classList.remove("hidden");
    }
  });
});

sendBtn.addEventListener("click", () => {
  if (!negocioActual) return;

  const comment = commentInput.value.trim();

  if (!comment) {
    alert("Escribe un comentario");
    return;
  }

  alert(`Enviado a: ${negocioActual.correo}\nComentario: ${comment}`);

  commentInput.value = "";
  form.classList.add("hidden");
});