const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const config = require('../config.json');

module.exports.sendMail = function(name, from, message) {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport(mailgunTransport({
            auth: {
                api_key: config.mailer.apiKey,
                domain: config.mailer.domain
            }
        }));

        let mailOptions = {
            from: "contact@lukeify.com",
            to: 'lukedavia@icloud.com',
            subject: 'lukeify.com website message',
            html: `<p>Message sent from ${name} &lt;${from}&gt;.</p><p>` + message + `</p>`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return reject(error);
            } else {
                return resolve(info);
            }
        });
    });
};