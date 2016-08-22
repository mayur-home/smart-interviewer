var Usertest = require('./userTest.schema');
var Question = require('../question/question.schema');
var AuthTest = require('../authTest/authTest.schema');
var mailUtils = require('../../utils/mail.utils');
var _ = require('lodash');
var Q = require('q');
var randtoken = require('rand-token');

module.exports = {
	getAll: getAll,
	getTest: getTest,
	createTest: createTest,
	getUserTests: getUserTests,
	recordAnswer: recordAnswer,
	markCompleted: markCompleted,
	getReport: getReport,
	checkStatus: checkStatus,
	setQuestionStatus: setQuestionStatus,
	deleteTest: deleteTest,
	markStart: markStart
};

//////////////////////////

function createTest(req, res) {
	Usertest.create(req.body, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		AuthTest.create({
			userTestId: test._id,
			token: randtoken.generate(16),
			email: test.email
		})
			.then(function(response) {
				// TODO - Need to convert this fixed text to template.
				var mailBody = 'Hi ' + test.firstName + ',<br/><br/>';
				mailBody += 'Please click on below link to start your test<br/>';
				mailBody += 'Link: '+ req.headers.origin +'/verifyToken/' + response.token;
				mailBody += '<br/> <br/>';
				mailBody += 'Thanks & Regards,<br/>';
				mailBody += 'Smart Interviewer Team';

				mailUtils.sendMail('', response.email, 'Congratulations!! Selected for Interview.!', mailBody, true);
				res.json(test);
			});
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

			var isCorrect;
			var report = {
				questionId: req.body.questionId,
				questionWeightage: question.weightage
			}

			if (question.type === 'DQ') {
				report.descriptiveAnswer = req.body.descriptiveAnswer;
			} else {
				if (_.isArray(req.body.answerId)) {
					isCorrect = true;
					_.some(req.body.answerId, function(answerId) {
						if (!_.find(question.answer, {id: parseInt(answerId)}).isCorrect) {
							isCorrect = false;
							return true;
						}
					});
				} else {
					isCorrect = _.find(question.answer, {id: parseInt(req.body.answerId)}).isCorrect;
				}
				report.isCorrect = isCorrect;
			}

			test.report.push(report);
			test.save();
			res.json({
				success: true
			});
		});
	});
}

function setQuestionStatus(req, res) {
	Usertest.findOne({_id: req.body.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		_.some(test.report, function(entry, index) {
			if (entry.questionId === req.body.questionId) {
				entry.isCorrect = req.body.status;
				test.report.set(index, entry);
				return true;
			}
		});

		test.save();
		res.json({
			status: req.body.status
		});
	});
}

function markStart(req, res) {
	Usertest.findOne({_id: req.body.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		test.startDate = new Date();
		test.save();
		res.json(test);
	});
}

function checkStatus(req, res) {
	var requiredTrueAnswers = req.query.requiredCorrect;
	var weightage = req.query.weightage;

	Usertest.findOne({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}

		var trueAnswers = _.filter(test.report, function(o){ return o.isCorrect && o.questionWeightage == weightage}).length;

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
		test.completionDate = new Date();
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
				res.json({
					testInfo: {
						name: test.name,
						formatted_completionDate: test.formatted_completionDate,
						formatted_startDate: test.formatted_startDate,
						firstName: test.firstName,
						lastName: test.lastName
					},
					report: report
				});
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

function deleteTest(req, res) {
	Usertest.findOneAndRemove({_id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}
