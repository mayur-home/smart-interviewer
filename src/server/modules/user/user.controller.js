var User = require('./user.schema');

module.exports = {
	getAll: getAll
};

//////////////////////////

function getAll() {
	User.find({}, function(err, result) {
		if (err) {
			res.json(500, err);
		}
		res.json(result);
	});
}
