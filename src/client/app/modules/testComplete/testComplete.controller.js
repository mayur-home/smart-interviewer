(function() {
	'use strict';

	angular
		.module('testComplete')
		.controller('TestCompleteController', TestCompleteController);

	/* @ngInject */
	function TestCompleteController($stateParams, $http, testService, logger) {
		var vm = this;
		vm.title = 'TestCompleteController';

		console.log($stateParams);
		$http.post('/api/userTest/markCompleted', {
			id: testService.getUserTestId()
		})
			.then(testCompletedSuccess)
			.catch(testCompletedFailure);

		function testCompletedSuccess(data) {
			console.log(data);
			logger.info('Test completed successfully');
		}

		function testCompletedFailure(error) {
			logger.error('Error in test completion', error);
		}
	}

})();
