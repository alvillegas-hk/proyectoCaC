const mysql = require('mysql2');
// const { Sequelize } = require('sequelize');


const conexionMySQL = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'proyectCAC',
    user: 'd3213',
    password: '123',
    decimalNumbers: true
});

module.exports =  conexionMySQL;