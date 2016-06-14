var Question = require('./question.schema');

module.exports = {
	create: create
};

/////////////////////

function create(req, res) {
	Question.create(req.body, function(err, question) {
		if(err) {
			res.json(500, err);
		}
		res.json(question);
	});
}
