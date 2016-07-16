var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

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
	tags: Array,
	explanation: String
});

questionSchema.index({question: 'text'});
questionSchema.index({tags: 1});
questionSchema.plugin(mongoosePaginate);

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
