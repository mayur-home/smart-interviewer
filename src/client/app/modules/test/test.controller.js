(function() {
	'use strict';

	angular
		.module('test')
		.controller('testController', testController);

	/* @ngInject */
	function testController(test, testService, adminTestService, $stateParams, $state, $http, logger) {
		// jshint validthis: true
		var vm = this;
		vm.startTest = startTest;
		vm.firstName = test.firstName;

		console.log(test);
		$http.get('/api/test/' + test.testId)
			.then(testSuccess)
			.catch(testFailure);

		function testSuccess(data) {
			console.log(data.data);
			testService.setId(data.data._id);
			testService.setQuestions(data.data.questions);
		}

		function testFailure(err) {
			logger.error(err);
		}

		///////////////////

		function startTest() {
			$state.go('question', {testId: testService.getId(), id: testService.getNextQuestion().value});
		}
	}
})();
