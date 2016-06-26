'use strict';

var userTest = require('./userTest.controller');

module.exports = function(router) {
	router.post('/userTest', userTest.createTest);
	router.get('/userTest', userTest.getAll);
	router.get('/userTest/:id', userTest.getTest);
	router.post('/userTest/recordAnswer', userTest.recordAnswer);
};
