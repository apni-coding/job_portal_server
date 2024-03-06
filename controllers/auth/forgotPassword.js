const { INTERNAL_SERVER_ERROR, USER_NOT_FOUND, INVALID_OTP } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require('../../response_messages/statusCode');
const { userModel } = require('../../models/userModel');
const { sendMailForVerification } = require("../../services/emailVerification");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        // If user not found return error
        if (!user) {
            return res.status(ERROR).json({ error: USER_NOT_FOUND });
        }

        //generate 6 digit otp
        const otp = '458548';

        //create mail and send to user
        const htmlContent = ``;

        const mailResponse = await sendMailForVerification(htmlContent, email);
        if (!mailResponse) {
            return res.status(ERROR).json({ error: SOMETHING_WENT_WRONG });;
        }

        await otpModel.create({ email, otp });

        // Return success response
        return res.status(SUCCESS).json({ token, message: OTP_SEND });
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        return res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};


const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        // Find OTP document in the database for the given email
        const otpDoc = await otpModel.findOne({ email });

        // If OTP document not found, return error
        if (!otpDoc) {
            return res.status(ERROR).json({ error: "OTP not found for the provided email" });
        }

        // Check if the OTP provided by the user matches the one stored in the database
        if (otp !== otpDoc.code) {
            return res.status(ERROR).json({ error: INVALID_OTP });
        };
        await otpModel.findOneAndUpdate({ email }, { otp: null });
        return res.status(SUCCESS).json({ message: OTP_VERIFIED });
    } catch (error) {
        console.error("Error occurred while verifying OTP:", error);
        return res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};

const updatePassword =async(req, res)=>{
    try {
        const { password, email } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        await userModel.findOneAndUpdate({ email }, { password:hashPassword });
        return res.status(SUCCESS).json({ message: USER_UPDATE });
    } catch (error) {
        console.error("Error occurred while update password:", error);
        return res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
}

module.exports = { forgotPassword, verifyOtp, updatePassword };
