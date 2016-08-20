'use strict';

var userTest = require('./userTest.controller');

module.exports = function(router) {
	router.post('/userTest', userTest.createTest);
	router.get('/userTest', userTest.getAll);
	router.get('/userTest/:id', userTest.getTest);
	router.post('/userTest/recordAnswer', userTest.recordAnswer);
	router.post('/userTest/markCompleted', userTest.markCompleted);
	router.post('/userTest/markStart', userTest.markStart);
	router.post('/userTest/setQuestionStatus', userTest.setQuestionStatus);
	router.get('/userTest/:id/report', userTest.getReport);
	router.get('/userTest/:id/checkStatus', userTest.checkStatus);
	router.delete('/userTest/:id/delete', userTest.deleteTest);
};
