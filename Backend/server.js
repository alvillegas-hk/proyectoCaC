// index.js
const express = require('express');
bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const port = 8750;

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());



const registerRoute = require("./route/register.route");
const userRoute = require("./route/user.route");
const authRoute = require("./route/auth.route");

app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors());


app.use("/user", userRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
