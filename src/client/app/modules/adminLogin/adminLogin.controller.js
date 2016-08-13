(function() {
	'use strict';

	angular
		.module('admin.login')
		.controller('AdminLoginController', AdminLoginController);

	/* @ngInject */
	function AdminLoginController(session, $state, logger, $scope) {
		var vm = this;
		vm.login = login;
		vm.register = register;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Admin Login controller');
		}

		$scope.$watch('vm.admin', function(oval, nval) {
			console.log(oval);
			console.log(nval);
		});

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
				vm.errors = err.errors;
				console.log(vm.errors);
				logger.info('Login failed');
			}
		}

		function register() {
			$state.go('adminRegistration');
		}
	}

})();
