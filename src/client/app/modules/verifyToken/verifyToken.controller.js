(function() {
	'use strict';

	angular
		.module('verifyToken')
		.controller('verifyTokenController', verifyTokenController);

	/* @ngInject */
	function verifyTokenController($http, $stateParams, $state, testService, logger) {
		var vm = this;
		vm.title = 'verifyToken';
		vm.verify = verify;

		activate();

		//////////////////

		function activate() {
			logger.info('Activated verifyToken View');
		}

		function verify() {
			var url = '/api/email/' + vm.model.email + '/token/' + $stateParams.token;
			$http.get(url)
				.then(function(response) {
					var data = response.data;
					testService.setUserTestId(data.userTestId);
					$state.go('test');
				})
				.catch(function(err) {
					var err = err.data;
					switch(err.code) {
						case 'TOKEN_NOT_FOUND':
							vm.errorMessage = 'Token is not valid.';
							break;
						case 'EMAIL_NOT_VERIFIED':
							vm.errorMessage = 'Email is not verified. Please try again with registered email.';
							break;
						default:
							vm.errorMessage = 'Please try again after sometime.'
					}
				});
		}
	}
})();
