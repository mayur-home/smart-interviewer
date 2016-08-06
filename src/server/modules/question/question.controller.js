/* jshint -W106,-W033 */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
var Question = require('./question.schema');
var Usertest = require('../userTest/userTest.schema');
var _ = require('lodash');
var fs = require('fs');
var mongoXlsx = require('mongo-xlsx');

module.exports = {
	create: create,
	getAll: getAll,
	get: get,
	getNext: getNext,
	getResult: getResult,
	getSerchResult: getSerchResult,
	postFile: postFile
};

/////////////////////

function create(req, res) {
	Question.create(req.body, function(err, question) {
		if (err) {
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

function get(req, res) {
	Question.findOne({_id: req.query.id}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		result.answer = _.map(result.answer, modifyAnswer);
		res.json(result);
	});
}

function getNext(req, res) {
	var weightage = req.query.weightage;
	var primaryTags = req.query.primaryTags ? (req.query.primaryTags).split(',') : [];
	var userTestId = req.query.userTestId;

	Usertest.findOne({_id: userTestId}, function(err, test) {
		if (err) {
			res.json(500, err);
		}

		var report = test.report;
		var questions = _.map(report, function(item) {
			return item.questionId;
		});

		Question.find({
			_id: { $nin: questions },
			tags: { $in: primaryTags},
			weightage: weightage
		}, function(err, questions) {
			if (!questions.length) {
				res.json({
					errors: [{
						reasonCode: 'NO_NEXT_QUESTION_WITH_TAG_WEIGHTAGE',
						message: 'Do not have next message'
					}]
				});
				return;
			}
			var randomQuestion = _.sample(questions);
			randomQuestion.answer = _.map(randomQuestion.answer, modifyAnswer);
			res.json(randomQuestion);
		});
	});
}

function getResult(req, res) {
	Question.findOne({_id: req.params.id}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		var answer = _.filter(result.answer, {id: parseInt(req.params.answerId)})[0];
		res.json({
			'isCorrect': answer.isCorrect
		});
	});
}

function getSerchResult(req, res) {
	Question.paginate({
			$or: [
				{tags: {$in: [(req.query.search).toLowerCase()]}},
				{$text: {$search: req.query.search}}
			]
		}, {page: req.query.page, limit: 5}, function(err, results) {
			if (err) {
				res.json(500, err);
			}
			res.json(results);
		});
}

function postFile(req, res) {
	/** When using the "single"
	 data come in "req.file" regardless of the attribute "name". **/
	var temporaryPath = req.file.path;

	/** The original name of the uploaded file
	 stored in the variable "originalname". **/
	var targetPath = 'uploads/' + req.file.originalname;

	/** A better way to copy the uploaded file. **/
	var src = fs.createReadStream(temporaryPath);
	var dest = fs.createWriteStream(targetPath);
	src.pipe(dest);
	src.on('end', function() {
		var model = null;
		mongoXlsx.xlsx2MongoData(targetPath, model, function(err, mongoData) {
			_.find(mongoData, function(data, index) {
				mongoData[index].tags = (data.tags).split(',');
			});
			Question.collection.insert(mongoData, function(err, data) {
				res.send(data);
			})
		});

	});
	src.on('error', function(err) {
		res.send('error');
	});
}

////////

function modifyAnswer(answer) {
	return {
		id: answer.id,
		answer: answer.answer
	}
}
