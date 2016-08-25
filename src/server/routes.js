'use strict';

var router = require('express').Router();

var routes = [
	'./modules/user/user.route',
	'./modules/question/question.route',
	'./modules/test/test.route',
	'./modules/userTest/userTest.route',
	'./modules/authentication/authentication.route',
	'./modules/authTest/authTest.route',
	'./modules/userOTP/userOTP.route'
];

for (var index in routes) {
	if (index) {
		require(routes[index])(router);
	}
}

module.exports = router;
