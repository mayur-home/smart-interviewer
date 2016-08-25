var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userOTPSchema = new Schema({
	email: String,
	otp: {type: String, index: true},
	isActive: Boolean,
	isExpired: Boolean // will be used in future.
});

var userOTP = mongoose.model('userOTP', userOTPSchema);

module.exports = userOTP;
