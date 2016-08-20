var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usertestSchema = new Schema({
	name: String,
	testId: String,
	type: String,
	creator: String,
	email: String,
	firstName: String,
	lastName: String,
	answers: [],
	isCompleted: Boolean,
	completionDate: Date,
	startDate: Date,
	report: Array,
	primaryTags: Array
});

usertestSchema
	.virtual('formatted_completionDate')
	.get(function() {
		var date = new Date(this.completionDate);
		return date.toUTCString();
	});

usertestSchema
	.virtual('formatted_startDate')
	.get(function() {
		var date = new Date(this.startDate);
		return date.toUTCString();
	});

var Usertest = mongoose.model('Usertest', usertestSchema);

module.exports = Usertest;
