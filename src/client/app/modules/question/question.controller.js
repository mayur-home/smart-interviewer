(function() {
	'use strict';

	angular
		.module('question')
		.controller('QuestionController', QuestionController);

	/* @ngInject */
	function QuestionController(testService, question, $state, $stateParams, $scope, $http, logger) {
		var vm = this;
		vm.title = 'QuestionController';
		vm.next = next;

		///////////////
		vm.question = question.question;
		vm.answers = question.answer;
		vm.snippet = question.snippet;
		vm.id = question._id;
		var userTestId = testService.getUserTestId();

		var isSmartTest = testService.getType() === 'smart';

		function next() {
			recordAnswer()
				.then(function() {
					if (isSmartTest) {
						evaluateNextQuestion();
					} else {
						var nextQuestion = testService.getNextQuestion().value;
						if (nextQuestion) {
							$state.go('question', {testId: $stateParams.testId, id: nextQuestion});
						} else {
							$state.go('testComplete', {testId: $stateParams.testId});
						}
					}
				});
		}

		function recordAnswer() {
			return testService.recordAnswer({
				questionId: vm.id,
				answerId: vm.answerId
			});
		}

		function evaluateNextQuestion() {
			testService.getNextSmartQuestion()
				.then(nextQuestionSuccess)
				.catch(nextQuestionFailure);

			function nextQuestionSuccess(response) {
				var nextQuestion = response.id;
				$state.go('question', {testId: userTestId, id: nextQuestion});
			}

			function nextQuestionFailure(err) {
				logger.error('Error loading next question', err);
				if (err && err.noMoreWeightage) {
					$state.go('testComplete');
					return;
				}
				evaluateNextQuestion();
			}
		}
	}

})();
