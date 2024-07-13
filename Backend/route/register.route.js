const express = require('express');

const verifyJWT = require('../middleware/verifyJWT');
const registerController = require('../controllers/register.controller');

const registerRouter = express.Router();

registerRouter.post('/', registerController.handleNewUser);

module.exports = registerRouter;