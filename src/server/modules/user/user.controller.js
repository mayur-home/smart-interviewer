var User = require('./user.schema');
var Usertest = require('../userTest/userTest.schema');
var mailUtils = require('../../utils/mail.utils');
var randtoken = require('rand-token');
var UserOTP = require('../userOTP/userOTP.schema');

module.exports = {
	getAll: getAll,
	create: create,
	addTest: addTest,
	getAllTests: getAllTests,
	getTestReport: getTestReport,
	activateUser: activateUser,
	resetPassword: resetPassword
};

//////////////////////////

function getAll(req, res) {
	User.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}

function create(req, res) {
	console.log('called profile create');
	req.body.activateToken = randtoken.generate(16);

	User.findOne({email: req.body.email}, function(err, user) {
		if (err) {
			res.json(500, err);
		}

		if (user) {
			res.json(400, {
				code: 'EMAIL_ALREADY_REGISTERED',
				message: 'This email is already registered. Please try login.'
			});
		} else {
			User.create(req.body, function(err, user) {
				if (err) {
					res.json(500, err);
				}
				// TODO - Need to convert this fixed text to template.
				var mailBody = 'Hello ' + user.firstName + ', <br/><br/>';
				mailBody += 'You have successfully registered with Smart Interviewer.!<br/>';
				mailBody += 'Please click on below link to activate your account<br/>';
				mailBody += 'Link: ' + req.headers.origin + '/activateUser/' + user.activateToken;
				mailBody += '<br/> <br/>';
				mailBody += 'Thanks & Regards,<br/>';
				mailBody += 'Smart Interviewer Team<br/>';
				mailUtils.sendMail('', user.email, 'Congratulations! Registered Successfully.', mailBody, true);
				res.json(user);
			});
		}
	});
}

function activateUser(req, res) {
	User.findOne({activateToken: req.body.token}, function(err, user) {
		if (err) {
			res.json(500, err);
		}
		if (!user) {
			res.json(404, {
				code: 'NOT_ACTIVATED',
				message: 'Not a valid link'
			});
		} else {
			user.isActive = true;
			user.save();
			res.json({
				success: true
			});
		}
	});
}

function addTest(req, res) {
	User.findOne({_id: req.body.userId}, function(err, user) {
		if (err) {
			res.json(500, err);
		}
		user.tests.push(req.body.testId);
		user.save();
		res.json(user);
	});
}

function getAllTests(req, res) {
	User.findOne({_id: req.params.userId})
		.populate('tests')
		.exec(function(err, user) {
			if (err) {
				res.json(500, err);
			}
			res.json(user.tests);
		});
}

function getTestReport(req, res) {
	User.findOne({_id: req.params.id}, function(err, user) {
		if (err) {
			res.json(500, err);
		}

		if ((user.tests).indexOf(req.params.testId) === -1) {
			res.json(400);
		}

		Usertest.findOne({_id: req.params.testId}, function(err, test) {
			if (err) {
				res.json(500, err);
			}
			res.json(test);
		});
	});
}

function resetPassword(req, res) {
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
			User.findOne({email: userOTP.email}, function(error, user) {
				if (error) {
					res.status(500)
						.json({
							error: 'SYSTEM_ERROR',
							message: 'System is unable to process your request.'
						});
					return;
				}

				if (user) {
					// updating active flag as OTP is not longer in use..
					userOTP.isActive = false;
					userOTP.save();

					// updating password..
					user.password = req.body.newPassword;
					user.save();

					var mailBody = 'Hello ' + user.firstName + ', <br/><br/>';
					mailBody += 'Your password has been changed successfully!<br/>';
					mailBody += 'Please try login to system using new password.<br/>';
					mailBody += '<br/> <br/>';
					mailBody += 'Thanks & Regards,<br/>';
					mailBody += 'Smart Interviewer Team<br/>';
					mailUtils.sendMail('', user.email, 'Password Reset Successfully!', mailBody, true);

					res.json({
						success: true
					});
				}
			});
		} else {
			res.status(404).json({
				error: 'OTP_EXPIRED',
				message: 'OTP which you are using that may be expired.'
			});
		}
	});
}
