const { config } = require('dotenv');
require('dotenv').config();
const nodemailer = require('nodemailer');

function sendEmails(email, subject, text) {

    var transport = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        host: process.env.HOST,
        port: process.env.NODEMAILERPORT,
        auth: {
            // user: "580e2052066f19",
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text
    };

    transport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("someError Occured", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });



}
module.exports = sendEmails