const mysql = require('mysql2');
// const { Sequelize } = require('sequelize');


const conexionMySQL = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'proyectCAC',
    user: 'devws',
    password: '!D7nmrnee5',
    decimalNumbers: true
});

module.exports =  conexionMySQL;