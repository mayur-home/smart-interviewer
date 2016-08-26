'use strict';

var user = require('./user.controller');
var auth = require('../../config/authentication');

module.exports = function(router) {
	router.post('/user', user.create);
	router.post('/user/test', user.addTest);
	router.get('/users', user.getAll);
	router.get('/user/:userId/tests', user.getAllTests);
	router.get('/user/:id/test/:testId/report', auth.ensureAuthenticated, user.getTestReport);
	router.post('/user/activate', user.activateUser);
	router.post('/user/resetPassword', user.resetPassword);
};
