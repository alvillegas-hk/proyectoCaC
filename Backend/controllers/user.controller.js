// const database = require('../config/db.config')

// const getAllUsers = (req, res) => {
//     queryUsers(req, async function (result) {
//       try {
//         res.json(result);
//       } catch (err) {
//         res.send({
//           status: "error",
//           message: err,
//         });
//       }
//     });
//   };
  
// const queryUsers = (req, callback) => {

//     let query= 'Select * from accounts';

//     database.getConnection(function (err, conn) {
//         if (err) {
//           console.log("Connection Error: " + err.message);
//           callback([]); // Llama a la función de devolución de llamada con un array vacío en caso de error de conexión
//           return;
//         }

//         conn.query(query, function (err, results, fields) {
//           if (err) {
//             console.log("SQL Query Error: " + err.message + " " + query);
//             callback([]); // Llama a la función de devolución de llamada con un array vacío en caso de error de consulta SQL
//           } else {
//             conn.release();
//             callback(results); // Llama a la función de devolución de llamada con los resultados de la consulta SQL
//           }
//         });
//     });
// }

// module.exports = { getAllUsers };


const database = require('../config/db.config');

// Método para obtener todos los usuarios
const getAllUsers = (req, res) => {
    queryUsers(req, async function (result) {
        try {
            res.json(result);
        } catch (err) {
            res.send({
                status: "error",
                message: err,
            });
        }
    });
};

const queryUsers = (req, callback) => {
    let query = `
        SELECT 
            u.user_id, 
            u.username, 
            r.description, 
            p.firstName, 
            p.lastName, 
            DATE(p.birth) AS birth, 
            a.account_id, 
            a.balance,
            ast.state 
        FROM users u
        JOIN users_accounts_relationship uar ON u.user_id = uar.user_id
        JOIN roles r ON u.role_id = r.role_id
        JOIN accounts a ON uar.account_id = a.account_id
        JOIN people p ON a.person_id = p.person_id
        JOIN accountState ast ON a.accountState_id = ast.accountState_id
    `;

    database.getConnection(function (err, conn) {
        if (err) {
            console.log("Connection Error: " + err.message);
            callback([]); // Llama a la función de devolución de llamada con un array vacío en caso de error de conexión
            return;
        }

        conn.query(query, function (err, results, fields) {
            if (err) {
                console.log("SQL Query Error: " + err.message + " " + query);
                callback([]); // Llama a la función de devolución de llamada con un array vacío en caso de error de consulta SQL
            } else {
                conn.release();
                callback(results); // Llama a la función de devolución de llamada con los resultados de la consulta SQL
            }
        });
    });
};

// Método para actualizar el estado de la cuenta de un usuario
const updateUser = (req, res) => {
    console.log(req.body)
    const { user_id, account_id } = req.body;

    if (!user_id || !account_id) {
        return res.status(400).json({ 'message': 'User ID and Account ID are required.' });
    }

    const updateQuery = `
        UPDATE accounts a
        JOIN users_accounts_relationship uar ON a.account_id = uar.account_id
        SET a.accountState_id = 2
        WHERE uar.user_id = ? AND a.account_id = ? AND a.accountState_id = 1
    `;

    database.getConnection(function (err, conn) {
        if (err) {
            console.log("Connection Error: " + err.message);
            return res.status(500).json({ 'message': 'Database connection error.' });
        }

        conn.query(updateQuery, [user_id, account_id], function (err, result) {
            conn.release();
            if (err) {
                console.log("SQL Query Error: " + err.message + " " + updateQuery);
                return res.status(500).json({ 'message': 'SQL query error.' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ 'message': 'No matching record found or state already updated.' });
            }

            res.status(200).json({ 'message': 'Account state updated successfully.' });
        });
    });
};

module.exports = { getAllUsers, updateUser };
