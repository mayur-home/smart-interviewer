'use strict';

var userOTP = require('./userOTP.controller');

module.exports = function(router) {
	router.post('/generateOTP', userOTP.generateOTP);
	router.post('/verifyOTP', userOTP.verifyOTP);
};
