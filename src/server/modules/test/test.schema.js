var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var testSchema = new Schema({
	// creating index on field id
	id: {type: Number, index: true},
	creator: String,
	name: String,
	questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

var Test = mongoose.model('Test', testSchema);

module.exports = Test;
