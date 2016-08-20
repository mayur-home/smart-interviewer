var AuthTest = require('../authTest/authTest.schema');
var _ = require('lodash');

module.exports = {
	verifyToken: verifyToken
};

//////////////////////////

function verifyToken(req, res) {
	var params = req.params;

	AuthTest.findOne({token: params.token}, function(err, token) {
		if (err) {
			res.json(500, err);
		}

		if (!token) {
			res.json(404, {
				code: 'TOKEN_NOT_FOUND',
				message: 'Token not valid'
			});
		} else if (token.email !== params.email) {
			res.json(404, {
				code: 'EMAIL_NOT_VERIFIED',
				message: 'Email not verified'
			});
		} else {
			res.json({
				userTestId: token.userTestId
			});
		}
	});
}
