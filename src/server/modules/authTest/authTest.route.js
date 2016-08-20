'use strict';

var authTest = require('./authTest.controller');

module.exports = function(router) {
	router.get('/email/:email/token/:token', authTest.verifyToken);
};
