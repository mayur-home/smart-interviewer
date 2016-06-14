'use strict';

var router = require('express').Router();

var routes = [
	'./modules/user/user.route'
];

for (var index in routes) {
	require(routes[index])(router);
}

module.exports = router;
