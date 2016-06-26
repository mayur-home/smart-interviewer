'use strict';

var question = require('./question.controller');

module.exports = function(router) {
	router.post('/question', question.create);
	router.get('/question', question.get);
	router.get('/questions', question.getAll);
	router.get('/search/question', question.getSerchResult);
	router.get('/question/:id/answer/:answerId', question.getResult);
};
