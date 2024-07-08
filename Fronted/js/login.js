const obtenerRespuesta = async () => {
    try {
        const respuesta = await axios.get('http://localhost:8750/');
        console.log(respuesta.data); // Mostrar la respuesta en la consola para verificar

        // Suponiendo que `respuesta.data.token` es el token que deseas almacenar
        const token = respuesta.data.token;

        // Guardar el token en el localStorage
        localStorage.setItem('token', token);

        // Opcional: puedes mostrar el token en una alerta
        // alert(`Token recibido: ${token}`);

    } catch (error) {
        console.error("Error al obtener la respuesta", error);
        alert("Error al obtener la respuesta");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const errorMessages = document.querySelectorAll(".error-message");

    // Ocultar los mensajes de error al cargar la página
    errorMessages.forEach((errorMessage) => {
        errorMessage.style.display = "none";
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const requiredFields = ["username", "password"];
        let isValid = true;

        requiredFields.forEach((fieldId) => {
            const field = document.getElementById(fieldId);
            const errorMessage = document.getElementById(fieldId + "-error");

            if (!field.value) {
                isValid = false;
                field.classList.add("error");
                if (errorMessage) { // Verificar si errorMessage no es null
                    errorMessage.textContent = "Este campo es obligatorio.";
                    errorMessage.style.display = 'block'; // Mostrar el mensaje de error
                }
            } else {
                field.classList.remove("error");
                if (errorMessage) { // Verificar si errorMessage no es null
                    errorMessage.textContent = ""; // Restablecer el mensaje de error
                    errorMessage.style.display = 'none'; // Ocultar el mensaje de error
                }
            }
        });

        if (isValid) {
            await obtenerRespuesta(); // Esperar a que se complete obtenerRespuesta
        }
    });

    // Mostrar el mensaje de error al salir del campo si está vacío
    contactForm.addEventListener('blur', (event) => {
        const field = event.target;
        const errorMessage = document.getElementById(field.id + '-error');

        if (!field.value) {
            field.classList.add('error');
            if (errorMessage) { // Verificar si errorMessage no es null
                errorMessage.style.display = 'block'; // Mostrar el mensaje de error
            }
        } else {
            field.classList.remove('error');
            if (errorMessage) { // Verificar si errorMessage no es null
                errorMessage.style.display = 'none'; // Ocultar el mensaje de error
            }
        }
    }, true);
});
