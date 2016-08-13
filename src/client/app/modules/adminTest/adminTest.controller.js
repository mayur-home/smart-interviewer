(function() {
	'use strict';

	angular
		.module('admin.test')
		.controller('AdminTestController', AdminTestController);

	/* @ngInject */
	function AdminTestController($scope, $http, adminTestService, testData, $q, logger) {
		var vm = this;
		var testId = testData._id;

		adminTestService.setId(testId);
		vm.title = 'AdminTestController';
		vm.testName = testData.name;
		vm.addQuestion = addQuestion;
		vm.deleteQuestion = deleteQuestion;
		vm.getQuestions = getQuestions;
		vm.questions = [];

		$scope.range = function(min, max, step) {
			step = step || 1;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};

		$scope.$watch('vm.search', function(newVal, oldVal) {
			getQuestions();
		});

		/////////////////

		function getQuestions(page) {
			var url = '/api/search/question?';
			url += ('search=' + vm.search);
			url += ('&page=' + page || 1);

			$http.get(url).then(function(questions) {
				vm.searchedQuestions = questions.data.docs;
				vm.pages = questions.data.pages;
				vm.currentPage = parseInt(questions.data.page);
			});
		}

		function addQuestion(id) {
			adminTestService.addQuestion(id)
				.then(addQuestionSuccess)
				.catch(addQuestionFailure);

			function addQuestionSuccess(data) {
				vm.questions.push(data.data);
			}

			function addQuestionFailure(err) {
				logger.error(err);
			}
		}

		function deleteQuestion(id) {
			adminTestService.removeQuestion(id)
				.then(deleteQuestionSuccess)
				.catch(deleteQuestionFailure);

			function deleteQuestionSuccess(question) {
				_.remove(vm.questions, function(n) {
					return n._id === question.data._id;
				});
			}

			function deleteQuestionFailure(err) {
				logger.error(err);
			}
		}
	}

})();
