var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var questionSchema = new Schema({
	// creating index on field id
	id: {type: Number, index: true},
	question: String,
	type: String,
	strength: Number,
	idealTime: Number,
	answer: Array
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
