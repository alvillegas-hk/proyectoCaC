document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu-icon');
  const navList = document.getElementById('nav-list');

  menuIcon.addEventListener('click', function() {
      navList.classList.toggle('show');
  });
});





document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const errorMessages = document.querySelectorAll(".error-message");

  // Ocultar los mensajes de error al cargar la página
  errorMessages.forEach((errorMessage) => {
    errorMessage.style.display = "none";
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = ["name", "email", "phone", "service", "terms"];
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      const errorMessage = document.getElementById(fieldId + "-error");

      if (!field.value || (field.type === "checkbox" && !field.checked)) {
        isValid = false;
        field.classList.add("error");
        errorMessage.textContent = "Este campo es obligatorio.";
        errorMessage.style.display = 'block'; // Mostrar el mensaje de error
      } else if (fieldId === "email" && !emailRegex.test(field.value)) {
        isValid = false;
        field.classList.add("error");
        errorMessage.textContent =
          "Por favor, introduce un correo electrónico válido.";
        errorMessage.style.display = 'block'; // Mostrar el mensaje de error
      } else {
        field.classList.remove("error");
        errorMessage.textContent = ""; // Restablece el mensaje de error
        errorMessage.style.display = 'none'; // Oculta el mensaje de error
      }
    });

    if (isValid) {
      contactForm.classList.add("d-none");
      document.getElementById("contactoExitoso").classList.remove("d-none");
    }
  });

  // Mostrar el mensaje de error al salir del campo si está vacío, el dato es incorrecto o el checkbox no está marcado
  contactForm.addEventListener('blur', (event) => {
    const field = event.target;
    const errorMessage = document.getElementById(field.id + '-error');

    if (!field.value || (field.type === 'email' && !validateEmail(field.value)) || (field.type === 'tel' && !validatePhone(field.value)) || (field.type === 'checkbox' && !field.checked)) {
      field.classList.add('error');
      if (field.type === 'email') {
        errorMessage.textContent = 'Por favor, introduce un correo electrónico válido.';
      } else {
        errorMessage.textContent = 'Este campo es obligatorio.';
      }
      errorMessage.style.display = 'block'; // Mostrar el mensaje de error
    } else {
      field.classList.remove('error');
      errorMessage.style.display = 'none'; // Oculta el mensaje de error
    }
  }, true);

  // Función para validar el formato del correo electrónico
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Función para validar el formato del número de teléfono
  function validatePhone(phone) {
    // Cambiado de longitud mínima requerida de 8
    return phone.length >= 8 && !isNaN(phone);
  }

});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const contactoExitoso = document.getElementById('contactoExitoso');

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validación y lógica de envío del formulario

      // Mostrar mensaje de éxito
      contactoExitoso.classList.remove('is-hidden');
      form.classList.add('is-hidden');
  });
});
