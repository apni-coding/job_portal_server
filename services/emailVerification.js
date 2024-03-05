const nodemailer = require('nodemailer');

async function sendMailForVerification(htmlContent, userMailId) {
    // 1. Create an email transporter.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'iprovivek@gmail.com',
            pass: 'yazacjhgxnbiaqsa'
        }
    });

    // 2. Configure email content.
    const mailOptions = {
        from: 'iprovivek@gmail.com',
        to: userMailId,
        subject: 'Email Verification',
        html: htmlContent
    };

    // 3. Send email.
    try {
        await transporter.sendMail(mailOptions);
        // console.log(result)
        // console.log('Email sent successfully');
        return true
    } catch (error) {
        console.log('Email send failed with error:', error);
        return false;
    }
}
// sendMail('idealtechguru1@gmail.com', 48748);

module.exports = { sendMailForVerification };
