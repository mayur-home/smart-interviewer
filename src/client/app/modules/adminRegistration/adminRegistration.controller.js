(function() {
	'use strict';

	angular
		.module('admin.registration')
		.controller('AdminRegistrationController', AdminRegistrationController);

	/* @ngInject */
	function AdminRegistrationController($http, $state, logger, $scope) {
		var vm = this;
		vm.submit = submit;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Signup controller');
		}

		$scope.$watch('vm.admin', function(oval, nval) {
			console.log(oval);
			console.log(nval);
		});

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
			}
		}
	}

})();
