// const sendEmail = async ({ to, subject, html }) => {
//     console.log("📧 Sending email to:", to);
//     console.log("Subject:", subject);
//     console.log("Content:", html);
//     // Later: integrate nodemailer or AWS SES
// };

// module.exports = { sendEmail };

const transporter = require("../config/mail");

const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    };

    console.log("mailOptions", mailOptions);
    console.log("transporter", transporter);

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };