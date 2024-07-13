const database = require('../config/db.config')

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

    let query= 'Select * from accounts';

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
}

module.exports = { getAllUsers };