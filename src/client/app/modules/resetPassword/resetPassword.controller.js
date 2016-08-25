(function() {
	'use strict';

	angular
		.module('resetPassword')
		.controller('ResetPasswordController', ResetPasswordController);

	/* @ngInject */
	function ResetPasswordController(logger, $http) {
		var vm = this;
		vm.title = 'Reset Password';
		vm.isOTPVerified = false;
		vm.isEmailVerified = false;
		vm.isEmailNotFound = false;

		/* Methods */
		vm.verifyOTP = verifyOTP;
		vm.checkEmailAndSendOTP = checkEmailAndSendOTP;

		activate();

		function activate() {
			logger.info('Activated Reset Password View.');
		}

		function verifyOTP() {
			var verifyOTPRequest = {
				email: vm.user.email,
				otp: vm.otp
			};

			$http.post('/api/verifyOTP', verifyOTPRequest)
				.then(verifySuccess, verifyFailure);

			function verifySuccess(response) {
				if (response.data.success) {
					vm.isOTPVerified = true;
				}
			}

			function verifyFailure(error) {
				logger.error('Error while checking OTP', error);
			}
		}

		function checkEmailAndSendOTP() {
			$http.post('/api/generateOTP', vm.user).then(success, failure);

			function success(response) {
				if (response.data.success) {
					vm.isEmailVerified = true;
					// resetting it to original as user cannot see failure message again.
					vm.isEmailNotFound = false;
				}
			}

			function failure(error) {
				if (error.data.error === 'USER_NOT_FOUND') {
					vm.isEmailNotFound = true;
				} else {
					logger.error('Error while checking Email ID or generating OTP', error);
				}
			}
		}
	}
})();
