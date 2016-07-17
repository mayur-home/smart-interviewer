var Test = require('./test.schema');
var Question = require('../question/question.schema');

module.exports = {
	create: create,
	get: get,
	getAll: getAll,
	addQuestion: addQuestion,
	deleteQuestion: deleteQuestion,
	getQuestions: getQuestions
};

/////////////////////

function create(req, res) {
	Test.create(req.body, function(err, question) {
		if (err) {
			res.json(500, err);
		}
		res.json(question);
	});
}

function addQuestion(req, res) {
	Test.findOne({_id: req.body.testId}, function(err, test) {
		if (err) {
			res.json(500, err);
		}

		if ((test.questions).indexOf(req.body.questionId) <= -1) {
			test.questions.push(req.body.questionId);
			test.save();
		}

		Question.findOne({_id: req.body.questionId}, function(err, result) {
			if (err) {
				res.json(500, err);
			}
			res.json(result);
		});
	});
}

function deleteQuestion(req, res) {
	Test.findOne({_id: req.query.testId}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		console.log(req.query.testId);
		console.log(test);
		test.questions.splice(test.questions.indexOf(req.query.questionId), 1);
		test.save();

		Question.findOne({_id: req.query.questionId}, function(err, result) {
			if (err) {
				res.json(500, err);
			}
			res.json(result);
		});
	});
}

function getQuestions(req, res) {
	Test.findOne({_id: req.query.testId})
		.populate('questions')
		.exec(function(err, test) {
			if (err) {
				res.json(500, err);
			}
			res.json(test.questions);
		});
}

function get(req, res) {
	Test.findOne({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}

function getAll(req, res) {
	Test.find({}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}
