var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var questionSchema = new Schema({
	// creating index on field id
	id: {type: Number, index: true},
	question: String,
	type: String,
	snippet: String,
	weightage: Number,
	idealTime: Number,
	answer: Array,
	tags: Array
});

questionSchema.index({question: 'text'});
questionSchema.index({tags: 1});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
