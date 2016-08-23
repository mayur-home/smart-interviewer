(function() {
	'use strict';

	angular
		.module('admin.login')
		.controller('AdminLoginController', AdminLoginController);

	/* @ngInject */
	function AdminLoginController(session, $state, logger) {
		var vm = this;
		vm.login = login;
		vm.register = register;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Admin Login controller');
		}

		function login() {
			session.signin({
					email: vm.admin.email,
					password: vm.admin.password
				})
				.then(loginSuccess)
				.catch(loginFailure);

			function loginSuccess(user) {
				logger.info('User has logged in successfully');
				$state.go('adminUser');
			}

			function loginFailure(err) {
				// vm.loginError
				vm.errorMessage = err.message;
				logger.info('Login failed');
			}
		}

		function register() {
			$state.go('adminRegistration');
		}
	}

})();
