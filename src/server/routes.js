'use strict';

var router = require('express').Router();

var routes = [
	'./modules/user/user.route',
	'./modules/question/question.route',
	'./modules/test/test.route'
];

for (var index in routes) {
	require(routes[index])(router);
}

module.exports = router;
