var Usertest = require('./userTest.schema');
var Question = require('../question/question.schema');
var _ = require('lodash');
var Q = require('q');

module.exports = {
	getAll: getAll,
	getTest: getTest,
	createTest: createTest,
	getUserTests: getUserTests,
	recordAnswer: recordAnswer,
	markCompleted: markCompleted,
	getReport: getReport,
	checkStatus: checkStatus
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
				questionWeightage: question.weightage,
				isCorrect: _.find(question.answer, {id: parseInt(req.body.answerId)}).isCorrect
			});
			test.save();
			res.json({
				success: true
			});
		});
	});
}

function checkStatus(req, res) {
	var requiredTrueAnswers = req.query.requiredCorrect;
	var weightage = req.query.weightage;

	Usertest.findOne({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}

		console.log(test.report);
		console.log(_.filter(test.report, { 'isCorrect': true, 'questionWeightage': weightage}));
		console.log(_.filter(test.report, function(o){ return o.isCorrect && o.questionWeightage == weightage}));

		var trueAnswers = _.filter(test.report, function(o){ return o.isCorrect && o.questionWeightage == weightage}).length;
		console.log(trueAnswers);
		console.log(requiredTrueAnswers);

		if (trueAnswers >= requiredTrueAnswers) {
			res.json({
				goAhead: true
			});
		} else {
			res.json({
				goAhead: false
			});
		}
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

		generateReport(test)
			.then(function(report) {
				res.json(report);
			});
	});
}

function generateReport(test) {
	var defer = new Q.defer();

	_.forEach(test.report, function(entry, index) {
		Question.findOne({_id: entry.questionId}, function(err, question) {
			entry.answerOptions = question.answer;
			entry.question = question.question;
			entry.questionType = question.type;
		})
			.then(function() {
				if(index+1 >= test.report.length) {
					defer.resolve(test.report);
				}
			});
	});

	return defer.promise;
}
