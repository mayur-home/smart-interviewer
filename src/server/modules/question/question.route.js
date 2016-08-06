'use strict';

var question = require('./question.controller');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

module.exports = function(router) {
	router.post('/question', question.create);
	router.get('/question', question.get);
	router.get('/question/next', question.getNext);
	router.get('/questions', question.getAll);
	router.get('/search/question', question.getSerchResult);
	router.get('/question/:id/answer/:answerId', question.getResult);
	router.post('/question/file', upload.single('file'), question.postFile);
};
