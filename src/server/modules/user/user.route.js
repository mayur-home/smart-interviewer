'use strict';

var user = require('./user.controller');

module.exports = function(router) {
	router.post('/user', user.create);
	router.get('/users', user.getAll);
};
