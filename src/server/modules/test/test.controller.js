var Test = require('./test.schema');

module.exports = {
	create: create,
	addQuestion: addQuestion,
	getQuestions: getQuestions
};

/////////////////////

function create(req, res) {
	Test.create(req.body, function(err, question) {
		if(err) {
			res.json(500, err);
		}
		res.json(question);
	});
}

function addQuestion(req, res) {
	Test.findOne({ _id: req.body._id}, function(err, test) {
		if(err) {
			res.json(500, err);
		}
		test.questions.push(req.body.questionId);
		test.save();
		res.json(req.body.questionId);
	});
}

function getQuestions(req, res) {
	Test.findOne({ _id: req.query._id})
		.populate('questions')
		.exec(function (err, test) {
			if (err) return handleError(err);
			console.log(test.questions);
			res.json(test.questions);
		});
}
