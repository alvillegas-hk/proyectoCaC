const express = require('express');
const userController = require('../controllers/user.controller');
const verifyJWT = require('../middleware/verifyJWT');


const registerRouter = express.Router();

registerRouter.get('/', verifyJWT, userController.getAllUsers);

module.exports = registerRouter;