(function() {
	'use strict';

	angular
		.module('admin.login')
		.controller('AdminLoginController', AdminLoginController);

	/* @ngInject */
	function AdminLoginController(session, $state, logger) {
		var vm = this;
		vm.signin = signin;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Admin Login controller');
		}

		function signin() {
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

			function loginFailure() {
				logger.info('Login failed');
			}
		}
	}

})();
