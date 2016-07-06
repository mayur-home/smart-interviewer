var Usertest = require('./userTest.schema');
var Question = require('../question/question.schema');
var _ = require('lodash');

module.exports = {
	getAll: getAll,
	getTest: getTest,
	createTest: createTest,
	getUserTests: getUserTests,
	recordAnswer: recordAnswer,
	markCompleted: markCompleted,
	getReport: getReport
};

//////////////////////////

function createTest(req, res) {
	Usertest.create(req.body, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}

function getAll(req, res) {
	Usertest.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}

function getUserTests(req, res) {
	Usertest.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}

function getTest(req, res) {
	Usertest.findOne({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}

function recordAnswer(req, res) {
	Usertest.findOne({_id: req.body.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}

		Question.findOne({_id: req.body.questionId}, function(err, question) {
			if (err) {
				res.json(500, err);
			}
			test.report.push({
				questionId: req.body.questionId,
				isCorrect: _.find(question.answer, {id: parseInt(req.body.answerId)}).isCorrect
			});
			test.save();
			res.json({
				success: true
			});
		});
	});
}

function markCompleted(req, res) {
	Usertest.findOne({_id: req.body.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		test.isCompleted = true;
		test.save();
		res.json(test);
	});
}

function getReport(req, res) {
	Usertest.findOne({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test.report);
	});
}
