(function() {
	'use strict';

	angular
		.module('resetPassword')
		.controller('ResetPasswordController', ResetPasswordController);

	/* @ngInject */
	function ResetPasswordController(logger, $http, $state) {
		var vm = this;
		vm.title = 'Reset Password';


		/* Methods */
		vm.verifyOTP = verifyOTP;
		vm.checkEmailAndSendOTP = checkEmailAndSendOTP;
		vm.resetPassword = resetPassword;

		activate();
		initValues();

		function activate() {
			logger.info('Activated Reset Password View.');
		}

		function initValues() {
			vm.isOTPVerified = false;
			vm.isEmailVerified = false;
			vm.isEmailNotFound = false;
			vm.passwordFailure = false;
			vm.isWrongOTP = false;
		}

		function verifyOTP() {
			vm.isWrongOTP = false;
			var verifyOTPRequest = {
				email: vm.user.email,
				otp: vm.otp
			};

			$http.post('/api/verifyOTP', verifyOTPRequest)
				.then(verifySuccess, verifyFailure);

			function verifySuccess(response) {
				if (response.data.success) {
					vm.isOTPVerified = true;
				} else {
					vm.isWrongOTP = true;
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
					vm.emailNotFoundMsg = error.data.message;
				} else {
					logger.error('Error while checking Email ID or generating OTP', error);
				}
			}
		}

		function resetPassword() {
			var resetPasswordRequest = {
				email: vm.user.email,
				otp: vm.otp,
				newPassword: vm.resetPassword.confirmNewPassword
			}

			$http.post('/api/user/resetPassword', resetPasswordRequest)
				.then(success)
				.catch(failure);

			function success(response) {
				if (response.data.success) {
					$state.go('adminLogin');
					logger.info('Your password has been changed successfully.');
				}
			}

			function failure(error) {
				logger.error('Error while updaing password.', error);
				if (error.data.error === 'OTP_EXPIRED') {
					vm.passwordFailureMsg = error.data.message;
					vm.passwordFailure = true;
				}
			}
		}
	}
})();
