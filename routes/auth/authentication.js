const express = require('express');
const { userRegister } = require('../../controllers/auth/register');
const { userValidation } = require('../../middlewares/userValidation');


const authRouter = express.Router();

authRouter.post('/register', userValidation, userRegister);
// authRouter.post('/login', );


module.exports = { authRouter };
