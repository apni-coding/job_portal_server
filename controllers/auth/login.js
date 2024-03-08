const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { INTERNAL_SERVER_ERROR, INVALID_CREDENTIALS,SIGN_IN_SUCCESSFULLY, ACCOUNT_NOT_VERIFY } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require('../../response_messages/statusCode');
const { userModel } = require('../../models/userModel');

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        
        // If user not found or password doesn't match, return error
        if (!user) {
            return res.status(ERROR).json({ error: INVALID_CREDENTIALS });
        }
        if(!user.verified){
            return res.status(ERROR).json({ error: ACCOUNT_NOT_VERIFY });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword){
            return res.status(ERROR).json({ error: INVALID_CREDENTIALS });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, userType: user.type }, process.env.JWTKEY, { expiresIn: '1h' });

        // Return success response with token
        return res.status(SUCCESS).json({ token , message:SIGN_IN_SUCCESSFULLY});
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        return res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};

module.exports = { userLogin };
