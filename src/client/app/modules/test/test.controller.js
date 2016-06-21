(function() {
	'use strict';

	angular
		.module('test')
		.controller('testController', testController);

	/* @ngInject */
	function testController(test, testService, $stateParams, $state, logger) {
		var vm = this;
		vm.startTest = startTest;

		testService.setId($stateParams.id);
		testService.setQuestions(test.questions);

		///////////////////

		function startTest() {
			$state.go('question', {testId: $stateParams.id, id: testService.getNextQuestion().value});
		}
	}
})();
