const { INTERNAL_SERVER_ERROR, USER_NOT_FOUND, INVALID_OTP,OTP_SEND, OTP_VERIFIED,PASSWORD_UPDATE, ACCOUNT_NOT_VERIFY  } = require("../../response_messages/errorMessage");
const { SUCCESS, ERROR } = require('../../response_messages/statusCode');
const { userModel } = require('../../models/userModel');
const { sendMailForVerification } = require("../../services/emailVerification");
const { otpModel } = require("../../models/otpModel");
const bcrypt = require('bcrypt');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });

        // If user not found return error
        if (!user) {
            return res.status(ERROR).json({ error: USER_NOT_FOUND });
        }
        if(!user.verified){
            return res.status(ERROR).json({ error: ACCOUNT_NOT_VERIFY });
        }
        //generate 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000);;

        //create mail and send to user
        const htmlContent = `
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            color: #007bff;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>OTP for Login</h1>
        </div>
        <div class="content">
            <p>Please use the below OTP to verify your account</p>
            <p style="color: orangered; font-size: 20px; font-weight: bolder; text-align: center;">${otp}</p>
            <p>This code is valid for the next ten minutes. Please do not share your OTP with anyone.</p>
        </div>
        <div class="footer">
            <p>If you did not make this request, you can safely ignore this email.</p>
        </div>
    </div>
</body>

</html>
`;

        const mailResponse = await sendMailForVerification(htmlContent, email);
        if (!mailResponse) {
            return res.status(ERROR).json({ error: SOMETHING_WENT_WRONG });;
        }

        let existingOTP = await otpModel.findOne({ email });

        // If an existing OTP is found, update its otp value
        if (existingOTP) {
          existingOTP.otp = otp;
          await existingOTP.save();
        } 
        // If no existing OTP is found, create a new one
        else {
          await otpModel.create({ email, otp });
        }

        // Return success response
        return res.status(SUCCESS).json({ otp, message: OTP_SEND });
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
        if (otp !== otpDoc.otp) {
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

        await userModel.findOneAndUpdate({ email }, { password:hashPassword }, { new: true });
        return res.status(SUCCESS).json({ message: PASSWORD_UPDATE });
    } catch (error) {
        console.error("Error occurred while update password:", error);
        return res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
}

module.exports = { forgotPassword, verifyOtp, updatePassword };
