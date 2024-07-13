// js/register.js
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Validación de campos obligatorios
    const requiredFields = ['username', 'password', 'firstName', 'lastName', 'typeDni', 'dni', 'birth', 'email', 'phone'];
    requiredFields.forEach(function(field) {
        const input = document.getElementById(field);
        const errorMessage = document.getElementById(`${field}-error`);
        if (!input.value.trim()) {
            input.classList.add('error');
            errorMessage.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('error');
            errorMessage.style.display = 'none';
        }
    });

    // Validación de DNI y teléfono solo números
    const dni = document.getElementById('dni');
    const phone = document.getElementById('phone');
    if (!/^\d+$/.test(dni.value)) {
        dni.classList.add('error');
        document.getElementById('dni-error').textContent = 'El documento debe contener solo números.';
        document.getElementById('dni-error').style.display = 'block';
        isValid = false;
    } else {
        dni.classList.remove('error');
        document.getElementById('dni-error').style.display = 'none';
    }
    if (!/^\d+$/.test(phone.value)) {
        phone.classList.add('error');
        document.getElementById('phone-error').textContent = 'El teléfono debe contener solo números.';
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    } else {
        phone.classList.remove('error');
        document.getElementById('phone-error').style.display = 'none';
    }

    // Validación de correo electrónico
    const email = document.getElementById('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        document.getElementById('email-error').textContent = 'Ingrese un correo electrónico válido.';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        email.classList.remove('error');
        document.getElementById('email-error').style.display = 'none';
    }

    // Envío de datos si todo es válido
    if (isValid) {
        const formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            typeDni: document.getElementById('typeDni').value,
            dni: document.getElementById('dni').value,
            birth: document.getElementById('birth').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        axios.post('http://localhost:8750/register', formData)
            .then(function(response) {
                console.log('Registro exitoso', response.data);
                // Redirigir o mostrar mensaje de éxito
            })
            .catch(function(error) {
                console.error('Error en el registro', error);
                // Mostrar mensaje de error
            });
    }
});
