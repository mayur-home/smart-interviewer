var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usertestSchema = new Schema({
	testId: String,
	creator: String,
	email: String,
	firstName: String,
	lastName: String,
	answers: [],
	isCompleted: Boolean,
	report: Array
});

var Usertest = mongoose.model('Usertest', usertestSchema);

module.exports = Usertest;
