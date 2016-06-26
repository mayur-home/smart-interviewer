var User = require('./user.schema');

module.exports = {
	getAll: getAll,
	create: create
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
