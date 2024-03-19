const express = require('express');
const { userRegister } = require('../../controllers/auth/register');
const { userValidation } = require('../../middlewares/userValidation');
const { userLogin } = require('../../controllers/auth/login');
const { forgotPassword, verifyOtp, updatePassword } = require('../../controllers/auth/forgotPassword');
const { verifyEmail } = require('../../controllers/auth/verifyEmail');
const { getUserProfile } = require('../../controllers/auth/userProfile');
const { getUserId } = require('../../middlewares/isUser');

const authRouter = express.Router();

authRouter.post('/register', userValidation, userRegister);
authRouter.post('/login', userLogin);
authRouter.post('/forgotpasswordotp', forgotPassword);
authRouter.post('/verifyotp', verifyOtp);
authRouter.put('/updatepassword', updatePassword);
authRouter.get('/verifyemail/:email/:verificationToken', verifyEmail);
authRouter.get('/myProfile', getUserId, getUserProfile);


module.exports = { authRouter };
