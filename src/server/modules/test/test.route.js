'use strict';

var test = require('./test.controller');

module.exports = function(router) {
	router.post('/test', test.create);
	router.post('/test/question', test.addQuestion);
	router.get('/test/question', test.getQuestions);
};
