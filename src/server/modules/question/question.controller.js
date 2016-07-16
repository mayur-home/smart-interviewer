/* jshint -W106,-W033 */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
var Question = require('./question.schema');
var _ = require('lodash');
var fs = require('fs');
var mongoXlsx = require('mongo-xlsx');

module.exports = {
	create: create,
	getAll: getAll,
	get: get,
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
	var tmp_path = req.file.path;

	/** The original name of the uploaded file
	 stored in the variable "originalname". **/
	var target_path = 'uploads/' + req.file.originalname;

	/** A better way to copy the uploaded file. **/
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);
	src.on('end', function() {
		var model = null;
		mongoXlsx.xlsx2MongoData(target_path, model, function(err, mongoData) {
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
