const express = require('express');

const authRouter = express.Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/', authController.handleLogin);

module.exports = authRouter;