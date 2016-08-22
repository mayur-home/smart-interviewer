var nodemailer = require('nodemailer');
var mailConfig = require('../config/mail.json');
var base64 = require('base-64');

function sendMail(from, to, subject, mailBody, isHTML) {
	var transporter = nodemailer.createTransport(getTransporterUrl());
	var mailOptions = {
		from: from,
		to: to,
		subject: subject
	};

	if (isHTML) {
		mailOptions.html = mailBody;
	} else {
		mailOptions.text = mailBody;
	}

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log('Error while sending mail', error);
		}

		console.log('Message sent: ' + info.response);
	})
}


function getTransporterUrl() {
	return mailConfig.protocol + '://' +
		mailConfig.mailId + ':' +
		base64.decode(mailConfig.password) + '@' +
		mailConfig.smtpServer;
}

module.exports = {
	sendMail: sendMail
};
