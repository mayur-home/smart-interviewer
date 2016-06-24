(function() {
	'use strict';

	angular
		.module('admin.user')
		.controller('AdminUserController', AdminUserController);

	/* @ngInject */
	function AdminUserController(logger, $http, $state) {
		var vm = this;
		vm.title = 'AdminQuestionController';
		vm.addTest = addTest;
		vm.createTestForCandidate = createTestForCandidate;

		$http.get('/api/test')
			.then(function(data) {
				vm.tests = data.data;
			});

		///////////////

		function addTest() {
			$state.go('adminTest');
		}

		function createTestForCandidate() {
			$http.post('/api/userTest', {
				testId: vm.candidate.test,
				email: vm.candidate.email,
				firstName: vm.candidate.firstName,
				lastName: vm.candidate.lastName
			})
				.then(createTestSuccess)
				.catch(createTestFailure);

			function createTestSuccess(test) {
				console.log(test);
				logger.info('User test created successfully');
			}

			function createTestFailure(err) {
				console.log(err);
			}
		}
	}

})();
