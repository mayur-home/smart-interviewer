'use strict';

var question = require('./question.controller');

module.exports = function(router) {
	router.post('/question', question.create);
};