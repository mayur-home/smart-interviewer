var Question = require('./question.schema');
var _ = require('lodash');

module.exports = {
	create: create,
	getAll: getAll,
	get: get,
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
		result.answer = _.map(result.answer, 'answer');
		res.json(result);
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
