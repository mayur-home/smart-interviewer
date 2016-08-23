(function() {
	'use strict';

	angular
		.module('resetPassword')
		.controller('ResetPasswordController', ResetPasswordController);

	/* @ngInject */
	function ResetPasswordController(logger) {
		var vm = this;
		vm.title = 'Reset Password';
		vm.isOTPVerified = false;
		vm.verifyOTP = verifyOTP;

		activate();

		function activate() {
			logger.info('Activated Reset Password View.');
		}

		function verifyOTP() {
			vm.isOTPVerified = true;
		}
	}
})();
