'use strict';

var user = require('./user.controller');

module.exports = function(router) {
	router.get('/users', user.getAll);
};
