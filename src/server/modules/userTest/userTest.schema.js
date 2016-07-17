var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usertestSchema = new Schema({
	testId: String,
	type: String,
	creator: String,
	email: String,
	firstName: String,
	lastName: String,
	answers: [],
	isCompleted: Boolean,
	report: Array,
	tags: Array
});

var Usertest = mongoose.model('Usertest', usertestSchema);

module.exports = Usertest;
