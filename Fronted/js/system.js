document.addEventListener("DOMContentLoaded", () => {
    const usernameLabel = document.getElementById('username');
    const logoutButton = document.getElementById('logoutButton');
    const refreshButton = document.getElementById('refreshButton');
    const usersTableBody = document.getElementById('usersTableBody');

    // Mostrar el nombre del usuario logueado
    const username = localStorage.getItem('username');
    if (username) {
        usernameLabel.textContent = username;
    }

    // Logout button functionality
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        window.location.href = 'http://127.0.0.1:5500/Fronted/index.html'; // Redirigir al index después del logout
    });

    // Function to load user data
    const cargarDatosUsuarios = async () => {
        try {
            const respuesta = await axios.get('http://localhost:8750/user/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            usersTableBody.innerHTML = ''; // Clear existing table rows

            respuesta.data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.description}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.birth}</td>
                    <td>${user.account_id}</td>
                    <td>${user.balance}</td>
                    <td>${user.state}</td>
                    <td><button class="button is-small is-info updateStateButton" data-user-id="${user.user_id}" data-account-id="${user.account_id}">Actualizar Estado</button></td>
                `;
                usersTableBody.appendChild(row);
            });

            // Add event listeners to the update buttons
            const updateStateButtons = document.querySelectorAll('.updateStateButton');
            updateStateButtons.forEach(button => {
                button.addEventListener('click', async (event) => {
                    const userId = event.target.getAttribute('data-user-id');
                    const accountId = event.target.getAttribute('data-account-id');
                    await actualizarEstadoCuenta(userId, accountId);
                });
            });

        } catch (error) {
            console.error('Error al cargar los datos de los usuarios', error);
        }
    };

    // Function to update account state
    const actualizarEstadoCuenta = async (userId, accountId) => {
        try {
            await axios.put('http://localhost:8750/user/updateUser', {
                user_id: userId,
                account_id: accountId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('Estado de la cuenta actualizado correctamente.');
            cargarDatosUsuarios(); // Reload data after update
        } catch (error) {
            console.error('Error al actualizar el estado de la cuenta', error);
            alert('Error al actualizar el estado de la cuenta.');
        }
    };

    // Load user data on page load
    cargarDatosUsuarios();

    // Refresh button functionality
    refreshButton.addEventListener('click', cargarDatosUsuarios);
});
