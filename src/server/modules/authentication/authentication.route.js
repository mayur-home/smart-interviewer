'use strict';

var auth = require('../../config/authentication'),
	session = require('../session/session.controller');

module.exports = function(router) {
	router.get('/auth/session', auth.ensureAuthenticated, session.session);
	router.post('/auth/session', session.login);
	router.delete('/auth/session', session.logout);
};
