const params = new URLSearchParams(window.location.search);
const negocio = params.get("negocio");

const config = {
  lavanderia: {
    nombre: "Lavandería de Tenis",
    correo: "lavanderia@example.com",
    google: "https://maps.app.goo.gl/MdsXH641Rm1zZKGUA"
  },
  pizzeria: {
    nombre: "Pizzería",
    correo: "pizzeria@example.com",
    google: "https://maps.app.goo.gl/yWmyNPfSGSHqiCqWA"
  }
};

const negocioActual = config[negocio];

const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
const form = document.getElementById("form");
const sendBtn = document.getElementById("sendBtn");
const commentInput = document.getElementById("comment");
const businessName = document.getElementById("businessName");

let selectedRating = 0;

if (negocioActual) {
  businessName.textContent = `¿Cómo fue tu experiencia en ${negocioActual.nombre}?`;
} else {
  businessName.textContent = "Negocio no configurado";
  ratingText.textContent = "Usa una URL como ?negocio=lavanderia";
}

function paintStars(value) {
  stars.forEach((star) => {
    const starValue = Number(star.dataset.value);

    if (starValue <= value) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function getRatingMessage(value) {
  if (value === 1) return "Muy mala";
  if (value === 2) return "Mala";
  if (value === 3) return "Regular";
  if (value === 4) return "Buena";
  if (value === 5) return "Excelente";
  return "Selecciona una cantidad de estrellas";
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    if (!negocioActual) {
      alert("Falta indicar el negocio en la URL. Ejemplo: ?negocio=lavanderia");
      return;
    }

    selectedRating = Number(star.dataset.value);
    paintStars(selectedRating);
    ratingText.textContent = getRatingMessage(selectedRating);

    if (selectedRating >= 4) {
      setTimeout(() => {
        window.location.href = negocioActual.google;
      }, 700);
    } else {
      form.classList.remove("hidden");
      commentInput.focus();
    }
  });
});

sendBtn.addEventListener("click", () => {
  if (!negocioActual) {
    alert("Negocio no configurado");
    return;
  }

  if (selectedRating === 0) {
    alert("Primero selecciona una calificación");
    return;
  }

  const comment = commentInput.value.trim();

  if (!comment) {
    alert("Por favor escribe un comentario");
    return;
  }

  alert(
    `Comentario enviado\n\nNegocio: ${negocioActual.nombre}\nCalificación: ${selectedRating}\nCorreo destino: ${negocioActual.correo}\nComentario: ${comment}`
  );

  commentInput.value = "";
  form.classList.add("hidden");
  selectedRating = 0;
  paintStars(0);
  ratingText.textContent = "Gracias por tu opinión";
});