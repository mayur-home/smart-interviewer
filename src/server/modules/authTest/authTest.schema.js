var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var authTestSchema = new Schema({
	token: String,
	email: String,
	userTestId: String
});

var AuthTest = mongoose.model('AuthTest', authTestSchema);

module.exports = AuthTest;
