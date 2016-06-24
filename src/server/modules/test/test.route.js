'use strict';

var test = require('./test.controller');

module.exports = function(router) {
	router.post('/test', test.create);
	router.post('/test/question', test.addQuestion);
	router.delete('/test/question', test.deleteQuestion);
	router.get('/test/questions', test.getQuestions);
	router.get('/test/:id', test.get);
	router.get('/test', test.getAll);
};
