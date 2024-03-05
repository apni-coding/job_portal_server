const bcrypt = require('bcrypt');
const { EMAIL_ALREADY_EXISTS, INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");
const { v4: uuid } = require('uuid');
const { sendMailForVerification } = require('../../services/emailVerification');
const { ERROR, SUCCESS } = require('../../response_messages/statusCode');
const { userModel } = require('../../models/userModel');

const userRegister = async (req, res) => {
    const { firstName, lastName, gender, email, password, type, skills, resume, profilePic } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(ERROR).json({ error: EMAIL_ALREADY_EXISTS });
        }

        // Generate verification token
        const verificationToken = Math.random().toString(36).substring(2, 5) + uuid();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            firstName,
            lastName,
            gender,
            email,
            type, 
            skills, 
            resume, 
            profilePic,
            verificationToken,
            password: hashedPassword
        };

        // Save user in db
        await userModel.create(newUser)

        const htmlContent =`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Email Template</title>
    <style>
        /* Add your styles here */
        @media only screen and (max-width: 600px) {
            /* Adjustments for smaller screens */
            .container {
                width: 100% !important;
                padding: 0 10px;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Ubuntu', sans-serif; background-color: #F9F9F9;">

    <!-- Container for the email content -->
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1); border-radius: 4px; overflow: hidden;">
        
        <!-- Header section -->
        <div style="background: #7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat; padding: 57px; text-align: center; color: white;">
            <h1 style="font-size: 36px; font-weight: 600; line-height: 36px;">Welcome to JOB PORTAL!</h1>
        </div>

        <!-- Main content section -->
        <div style="padding: 40px 20px;">
            <img src="https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png" alt="Party Wumpus" style="width: 100%; max-width: 500px; height: auto; margin-bottom: 20px;">
            <h2 style="font-size: 20px; font-weight: 500; color: #4F545C; letter-spacing: 0.27px; margin-bottom: 10px;">Hey ${firstName},</h2>
            <p style="color: #737F8D; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Wowwee! Thanks for registering an account with Job Portal! </p>
            <p style="color: #737F8D; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Before we get started, we'll need to verify your email.</p>
            <div style="text-align: center;">
                <a href="http://localhost:5000/test" style="display: inline-block; background-color: #7289DA; color: white; text-decoration: none; font-family: 'Ubuntu', sans-serif; font-size: 15px; font-weight: normal; padding: 15px 30px; border-radius: 3px;">Verify Email</a>
            </div>
        </div>

        <!-- Footer section -->
        <div style="background: transparent; text-align: center; padding: 20px 0;">
            <p style="color: #99AAB5; font-size: 12px; line-height: 24px; margin: 0;">Sent by Dummy • <a href="test.com" style="color: #1EB0F4; text-decoration: none;">check our blog</a> • <a href="https://twitter.com/" style="color: #1EB0F4; text-decoration: none;">@dummyapp</a></p>
        </div>

    </div>
</body>
</html>`;
        //send email verfication mail 
        const mailSend = await sendMailForVerification(htmlContent, email);
        if (mailSend) {
            return res.status(SUCCESS).json(newUser);
        } else {
            res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
        }
    } catch (error) {
        console.error(error);
        res.status(ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
};

module.exports = { userRegister };
