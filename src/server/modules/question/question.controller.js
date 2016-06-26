var Question = require('./question.schema');
var _ = require('lodash');

module.exports = {
	create: create,
	getAll: getAll,
	get: get,
	getResult: getResult,
	getSerchResult: getSerchResult
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
	Question.findOne({ _id: req.query.id }, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		result.answer = _.map(result.answer, modifyAnswer);
		res.json(result);
	});
}

function getResult(req, res) {
	Question.findOne({ _id: req.params.id }, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		console.log(result.answer);
		console.log(req.params.answerId);
		var answer = _.filter(result.answer, {id: parseInt(req.params.answerId)})[0];
		console.log(answer);
		res.json({
			'isCorrect': answer.isCorrect
		});
	});
}

function getSerchResult(req, res) {
	Question.find({$or:[
		{ tags: { $in: [(req.query.search).toLowerCase()] } },
		{ $text: { $search: req.query.search } }
	]})
		.exec(function(err, results) {
			if (err) {
				res.json(500, err);
			}
			res.json(results);
		});
}

////////

function modifyAnswer(answer) {
	return {
		id: answer.id,
		answer: answer.answer
	}
}
