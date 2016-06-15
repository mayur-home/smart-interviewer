var Question = require('./question.schema');

module.exports = {
	create: create,
	getAll: getAll
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

function getAll(req, res) {
	Question.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}
