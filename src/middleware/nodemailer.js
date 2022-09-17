const nodemailer = require('nodemailer');
const { config } = require('dotenv')
require('dotenv').config()

function sendEmails(email) {

    var transport = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
            // user: "580e2052066f19",
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: 'ujjwalanand4277@gmail.com',
        to: email,
        subject: "Welcome To Au",
        text: "Create Your Own Task check It Read Do And Complete It"
    };

    transport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });



}
module.exports = sendEmails