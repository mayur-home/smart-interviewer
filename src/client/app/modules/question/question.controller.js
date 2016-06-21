(function() {
	'use strict';

	angular
		.module('question')
		.controller('QuestionController', QuestionController);

	/* @ngInject */
	function QuestionController(testService, question, $state, $stateParams, logger) {
		var vm = this;
		vm.title = 'QuestionController';
		vm.next = next;

		///////////////
		vm.question = question.question;

		function next() {
			$state.go('question', {testId: $stateParams.testId, id: testService.getNextQuestion().value});
		}
	}

})();
