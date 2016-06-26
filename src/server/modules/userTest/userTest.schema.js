var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usertestSchema = new Schema({
	testId: String,
	email: String,
	firstName: String,
	lastName: String,
	answers: []
});

var UsertestSchema = mongoose.model('UsertestSchema', usertestSchema);

module.exports = UsertestSchema;
