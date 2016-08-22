(function() {
	'use strict';

	angular
		.module('activateUser')
		.controller('activateUserController', activateUserController);

	/* @ngInject */
	function activateUserController($http, $state, $stateParams, logger) {
		var vm = this;
		vm.title = 'activateUser';

		activate();

		//////////////

		function activate() {
			logger.info('Activated activateUser View');

			$http.post('/api/user/activate', {
				token: $stateParams.token
			})
				.then(activateSuccess)
				.catch(activateFailure);

			function activateSuccess() {
				$state.go('adminLogin');
			}

			function activateFailure(data) {
				var err = data.data;
				vm.errorMessage = err.message;
			}
		}
	}
})();
