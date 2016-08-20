(function() {
	'use strict';

	angular
		.module('test')
		.controller('testController', testController);

	/* @ngInject */
	function testController(test, testService, $state, $http, logger) {
		// jshint validthis: true
		var vm = this;
		vm.startTest = startTest;
		vm.firstName = test.firstName;
		vm.isTestCompleted = test.isCompleted;

		// testService.setUserTestId(test._id);
		testService.setTestType(test.type);
		testService.setPrimaryTags(test.primaryTags ? (test.primaryTags).join(',') : '');
		testService.resetQuestionCounter();

		// Get the question list and store it in cache(testService) in
		// case of FIXED test
		if (!test.isCompleted && test.type !== 'smart') {
			$http.get('/api/test/' + test.testId)
				.then(testSuccess)
				.catch(testFailure);
		}

		function testSuccess(data) {
			testService.setId(data.data._id);
			testService.setQuestions(data.data.questions);
		}

		function testFailure(err) {
			logger.error(err);
		}

		///////////////////

		function startTest() {
			$http.post('/api/userTest/markStart', {id: testService.getUserTestId()})
				.then(loadQuestion);

			function loadQuestion() {
				if (test.type === 'smart') {
					testService.getNextSmartQuestion()
						.then(function(response) {
							var nextQuestion = response.id;
							$state.go('question', {testId: test._id, id: nextQuestion});
						});
					return;
				}
				$state.go('question', {testId: testService.getId(), id: testService.getNextQuestion().value});
			}
		}
	}
})();
