'use strict';

var question = require('./question.controller');

module.exports = function(router) {
	router.post('/question', question.create);
	router.get('/question', question.getAll);
	router.get('/search/question', question.getSerchResult);
};
