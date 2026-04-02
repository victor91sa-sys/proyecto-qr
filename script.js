// Leer el parámetro ?negocio= del link
const params = new URLSearchParams(window.location.search);
const negocio = params.get("negocio");

// Configuración de cada negocio
const config = {
  taqueria: {
    correo: "lavanderiadetenis.tenis@gmail.com",
    google: "https://maps.app.goo.gl/gPu7P28wQn9R11nc6"
  },
  cafe: {
    correo: "victor91sa@gmail.com",
    google: "https://www.google.com/maps"
  },
  barberia: {
    correo: "barberia@gmail.com",
    google: "https://www.google.com/maps"
  }
};

// Si no existe el negocio en el link, usar null
const negocioActual = config[negocio];

// Cuando el usuario califica
function rate(value) {
  if (!negocioActual) {
    alert("Negocio no configurado");
    return;
  }

  if (value >= 4) {
    window.location.href = negocioActual.google;
  } else {
    document.getElementById("form").classList.remove("hidden");
  }
}

// Cuando el usuario envía comentario
function sendFeedback() {
  if (!negocioActual) {
    alert("Negocio no configurado");
    return;
  }

  const comment = document.getElementById("comment").value;

  if (!comment.trim()) {
    alert("Por favor escribe un comentario");
    return;
  }

  alert(
    "Aquí se enviará el comentario a:\n" +
    negocioActual.correo +
    "\n\nComentario:\n" +
    comment
  );

  // Más adelante aquí pondremos EmailJS real
}