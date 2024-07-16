const express = require('express');
const userController = require('../controllers/user.controller');
const verifyJWT = require('../middleware/verifyJWT');


const registerRouter = express.Router();

registerRouter.get('/users', verifyJWT, userController.getAllUsers);
registerRouter.put('/updateUser', userController.updateUser);



module.exports = registerRouter;