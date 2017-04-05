var nodemailer = require('nodemailer');
var mailConfig = require('../config/mail.json');
var base64 = require('base-64');
var xoauth2 = require('xoauth2');

function sendMail(from, to, subject, mailBody, isHTML) {
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			xoauth2: xoauth2.createXOAuth2Generator(getTransportData())
		}
	});

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


function getTransportData() {
	return {
		user: 'contact.smart.interviewer@gmail.com',
		clientId: '937377912994-o7cfv59qgi4tcc018u4hjrumon9jkte8.apps.googleusercontent.com',
		clientSecret: '5cmFFxIpLmrtVmAFGjHwj39b',
		refreshToken: '1/kh8qotjsplV8-QAFBk-DKE_G1-MCebANBAScqS9c_Z8'
	}
}

module.exports = {
	sendMail: sendMail
};
