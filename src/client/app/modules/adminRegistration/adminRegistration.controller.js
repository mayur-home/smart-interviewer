(function() {
	'use strict';

	angular
		.module('admin.registration')
		.controller('AdminRegistrationController', AdminRegistrationController);

	/* @ngInject */
	function AdminRegistrationController($http, $state, logger) {
		var vm = this;
		vm.submit = submit;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Signup controller');
		}

		function submit() {
			$http.post('/api/user', vm.admin)
				.then(profileCreateSuccessful)
				.catch(profileCreateFailure);

			function profileCreateSuccessful(user) {
				console.log(user);
				$state.go('adminLogin');
			}

			function profileCreateFailure(err) {
				logger.error(err);

				vm.errorMessage = err.data.message;
				if (err.data.code === 'EMAIL_ALREADY_REGISTERED') {
					angular.element('.login').trigger('focus');
				}
			}
		}
	}

})();
