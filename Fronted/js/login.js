// const enviarCredenciales = async (username, password) => {
//     try {
//         const respuesta = await axios.post('http://localhost:8750/auth', {
//             username: username,
//             password: password
//         });

//         console.log(respuesta.data); // Mostrar la respuesta en la consola para verificar

//         // Suponiendo que `respuesta.data.accessToken` y `respuesta.data.refreshToken` son los tokens que deseas almacenar
//         const accessToken = respuesta.data.accessToken;
//         const refreshToken = respuesta.data.refreshToken;

//         console.log(accessToken, refreshToken);

//         // Guardar los tokens en el localStorage
//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', refreshToken);


//     } catch (error) {
//         console.error("Error al enviar las credenciales", error);
//         alert("Error al enviar las credenciales");
//     }
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const contactForm = document.getElementById('contactForm');
//     const errorMessages = document.querySelectorAll(".error-message");

//     // Ocultar los mensajes de error al cargar la página
//     errorMessages.forEach((errorMessage) => {
//         errorMessage.style.display = "none";
//     });

//     contactForm.addEventListener("submit", async (event) => {
//         event.preventDefault();
//         const requiredFields = ["username", "password"];
//         let isValid = true;

//         requiredFields.forEach((fieldId) => {
//             const field = document.getElementById(fieldId);
//             const errorMessage = document.getElementById(fieldId + "-error");

//             if (!field.value) {
//                 isValid = false;
//                 field.classList.add("error");
//                 if (errorMessage) {
//                     errorMessage.textContent = "Este campo es obligatorio.";
//                     errorMessage.style.display = 'block';
//                 }
//             } else {
//                 field.classList.remove("error");
//                 if (errorMessage) {
//                     errorMessage.textContent = "";
//                     errorMessage.style.display = 'none';
//                 }
//             }
//         });

//         if (isValid) {
//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;

//             // Llamar a la función para enviar las credenciales
//             await enviarCredenciales(username, password);
//         }
//     });

//     contactForm.addEventListener('blur', (event) => {
//         const field = event.target;
//         const errorMessage = document.getElementById(field.id + '-error');

//         if (!field.value) {
//             field.classList.add('error');
//             if (errorMessage) {
//                 errorMessage.style.display = 'block';
//             }
//         } else {
//             field.classList.remove('error');
//             if (errorMessage) {
//                 errorMessage.style.display = 'none';
//             }
//         }
//     }, true);
// });


const enviarCredenciales = async (username, password) => {
    try {
        const respuesta = await axios.post('http://localhost:8750/auth', {
            username: username,
            password: password
        });

        console.log(respuesta.data); // Mostrar la respuesta en la consola para verificar

        const accessToken = respuesta.data.accessToken;
        const refreshToken = respuesta.data.refreshToken;

        console.log(accessToken, refreshToken);

        // Guardar los tokens en el localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Guardar el nombre de usuario en el localStorage
        localStorage.setItem('username', username);

        // Redirigir al usuario a la URL especificada
        if (respuesta.data.redirectUrl) {
            window.location.href = respuesta.data.redirectUrl;
        }
    } catch (error) {
        console.error("Error al enviar las credenciales", error);
        alert(error.response.data.message || "Error al enviar las credenciales");
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
                if (errorMessage) {
                    errorMessage.textContent = "Este campo es obligatorio.";
                    errorMessage.style.display = 'block';
                }
            } else {
                field.classList.remove("error");
                if (errorMessage) {
                    errorMessage.textContent = "";
                    errorMessage.style.display = 'none';
                }
            }
        });

        if (isValid) {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Llamar a la función para enviar las credenciales
            await enviarCredenciales(username, password);
        }
    });

    contactForm.addEventListener('blur', (event) => {
        const field = event.target;
        const errorMessage = document.getElementById(field.id + '-error');

        if (!field.value) {
            field.classList.add('error');
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
        } else {
            field.classList.remove('error');
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    }, true);
});
