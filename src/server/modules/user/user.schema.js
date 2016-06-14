var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
	// creating index on field id
	id: {type: Number, index: true},
	firstName: String,
	lastName: String,
	age: String,
	location: String,
	email: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
