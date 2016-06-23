var Usertest = require('./userTest.schema');

module.exports = {
	getAll: getAll,
	getTest: getTest,
	createTest: createTest
};

//////////////////////////

function createTest(req, res) {
	Usertest.create(req.body, function(err, test) {
		if(err) {
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

function getTest(req, res) {
	Usertest.findOne({ _id: req.params.id}, function(err, test) {
		if (err) {
			res.json(500, err);
		}
		res.json(test);
	});
}


