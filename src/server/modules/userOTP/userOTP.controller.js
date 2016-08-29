var randtoken = require('rand-token');
var UserOTP = require('./userOTP.schema');
var User = require('../user/user.schema');
var mailUtils = require('../../utils/mail.utils');

module.exports = {
	generateOTP: generateOTP,
	verifyOTP: verifyOTP
};

//////////////////////////

function generateOTP(req, res) {
	User.findOne({email: req.body.email}, function(err, user) {
		if (err) {
			res.status(500)
				.json({
					error: 'SYSTEM_ERROR',
					message: 'System is unable to process your request.'
				});
			return;
		} else if (!user) {
			res.status(404)
				.json({
					error: 'USER_NOT_FOUND',
					message: 'User is not registered.'
				});
			return;
		}

		req.body.otp = randtoken.generate(5);
		req.body.isActive = true;
		UserOTP.create(req.body, function(err, userOTP) {
			if (err) {
				res.status(500)
					.json({
						error: 'OTP_CANNOT_GENERATED',
						message: 'There was some issue while generating OTP. Please try after sometime.'
					});
			} else {
				// TODO - Need to move this to templates
				var mailBody = 'Hello ' + user.firstName + ',<br/><br/>';
				mailBody += 'You have requested for Reset Password. Please find below OTP for it and Reset your Password.<br/>';
				mailBody += 'Your OTP: <b>' + userOTP.otp + '</b><br/><br/>';
				mailBody += 'Thanks & Regards,<br/>';
				mailBody += 'Smart Interviewer Team';

				mailUtils.sendMail('', user.email, 'Smart Interviewer: Reset Password',mailBody, true);

				res.json({
					success: true
				});
			}
		});
	});
}

function verifyOTP(req, res) {
	UserOTP.findOne({email: req.body.email, otp: req.body.otp, isActive: true}, function(err, userOTP) {
		if (err) {
			res.status(500)
				.json({
					error: 'SYSTEM_ERROR',
					message: 'System is unable to process your request.'
				});
			return;
		}

		if (userOTP) {
			// Need to de-activated that otp so it cannot use again.
			// userOTP.isActive = false;
			// userOTP.save();
			res.json({success: true});
		} else {
			res.json({success: false});
		}
	});
}
