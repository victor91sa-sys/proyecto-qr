const params = new URLSearchParams(window.location.search);
const negocio = params.get("negocio");

const config = {
  taqueria: {
    nombre: "Taquería Sol",
    mensaje: "Tu opinión nos ayuda a servir mejores tacos cada día.",
    correo: "taqueria@gmail.com",
    google: "https://www.google.com/maps",
    color: "#9a3412",
    fondo: "assets/taqueria.jpg",
    logo: "assets/logo-taqueria.png"
  },
  cafe: {
    nombre: "Café Luna",
    mensaje: "Gracias por compartir este momento con nosotros.",
    correo: "cafe@gmail.com",
    google: "https://www.google.com/maps",
    color: "#6f4e37",
    fondo: "assets/cafe.jpg",
    logo: "assets/logo-cafe.png"
  },
  barberia: {
    nombre: "Barbería Central",
    mensaje: "Queremos conocer tu experiencia para seguir mejorando.",
    correo: "barberia@gmail.com",
    google: "https://www.google.com/maps",
    color: "#1f2937",
    fondo: "assets/barberia.jpg",
    logo: "assets/logo-barberia.png"
  },
  demo: {
    nombre: "Restaurante Demo",
    mensaje: "Gracias por visitarnos. Tu opinión nos ayuda a mejorar.",
    correo: "demo@gmail.com",
    google: "https://www.google.com/maps",
    color: "#7a4b2f",
    fondo: "",
    logo: ""
  }
};

const negocioActual = config[negocio];

const businessName = document.getElementById("businessName");
const businessMessage = document.getElementById("businessMessage");
const logo = document.getElementById("logo");
const form = document.getElementById("form");
const commentInput = document.getElementById("comment");

if (negocioActual) {
  businessName.textContent = negocioActual.nombre;
  businessMessage.textContent = negocioActual.mensaje;

  if (negocioActual.color) {
    document.documentElement.style.setProperty("--brand-color", negocioActual.color);
  }

  if (negocioActual.fondo && negocioActual.fondo.trim() !== "") {
    document.body.style.backgroundImage = `url("${negocioActual.fondo}")`;
  }

  if (negocioActual.logo && negocioActual.logo.trim() !== "") {
    logo.src = negocioActual.logo;
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
} else {
  businessName.textContent = "Negocio no configurado";
  businessMessage.textContent = "Revisa la URL o configura este negocio en script.js.";
  logo.style.display = "none";
}

function rate(value) {
  if (!negocioActual) {
    alert("Negocio no configurado");
    return;
  }

  if (value >= 4) {
    window.location.href = negocioActual.google;
    return;
  }

  form.classList.remove("hidden");
}

function sendFeedback() {
  if (!negocioActual) {
    alert("Negocio no configurado");
    return;
  }

  const comment = commentInput.value.trim();

  if (!comment) {
    alert("Por favor escribe un comentario");
    return;
  }

  alert(
    "Aquí se enviará el comentario a:\n" +
    negocioActual.correo +
    "\n\nComentario:\n" +
    comment
  );

  commentInput.value = "";
  form.classList.add("hidden");
}