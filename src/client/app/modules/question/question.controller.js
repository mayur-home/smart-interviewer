(function() {
	'use strict';

	angular
		.module('question')
		.controller('QuestionController', QuestionController);

	/* @ngInject */
	function QuestionController(testService, question, $state, $stateParams, $http, logger) {
		var vm = this;
		vm.title = 'QuestionController';
		vm.next = next;

		///////////////
		vm.question = question.question;
		vm.answers = question.answer;
		vm.id = question._id;

		function next() {
			recordAnswer()
				.then(function() {
					var nextQuestion = testService.getNextQuestion().value;
					if (nextQuestion) {
						$state.go('question', {testId: $stateParams.testId, id: nextQuestion});
					} else {
						$state.go('testComplete', {testId: $stateParams.testId});
					}
				});
		}

		function recordAnswer() {
			return testService.recordAnswer({
				questionId: vm.id,
				answerId: vm.answerId
			});
		}
	}

})();
