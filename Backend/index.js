// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8750;

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

app.get('/', (req, res) => {
    res.send('Lo has logrado');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
