var User = require('./user.schema');
var Usertest = require('../userTest/userTest.schema');
var _ = require('lodash');

module.exports = {
	getAll: getAll,
	create: create,
	addTest: addTest,
	getAllTests: getAllTests,
	getTestReport: getTestReport
};

//////////////////////////

function getAll(req, res) {
	User.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}

function create(req, res) {
	console.log('called profile create');
	User.create(req.body, function(err, user) {
		if (err) {
			res.json(500, err);
		}
		res.json(user);
	});
}

function addTest(req, res) {
	User.findOne({_id: req.body.userId}, function(err, user) {
		if (err) {
			res.json(500, err);
		}
		user.tests.push(req.body.testId);
		user.save();
		res.json(user);
	});
}

function getAllTests(req, res) {
	User.findOne({_id: req.params.userId})
		.populate('tests')
		.exec(function(err, user) {
			if (err) {
				res.json(500, err);
			}
			res.json(user.tests);
		});
}

function getTestReport(req, res) {
	User.findOne({_id: req.params.id}, function(err, user) {
		if (err) {
			res.json(500, err);
		}

		if ((user.tests).indexOf(req.params.testId) === -1) {
			res.json(400);
		}

		Usertest.findOne({_id: req.params.testId}, function(err, test) {
			if (err) {
				res.json(500, err);
			}
			res.json(test);
		});
	});
}
