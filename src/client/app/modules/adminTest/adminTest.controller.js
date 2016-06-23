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
		vm.addQuestion = addQuestion;
		vm.deleteQuestion = deleteQuestion;
		vm.questions = [];

		$scope.$watch('vm.search', function(newVal, oldVal) {
			getQuestions(newVal);
		});

		/////////////////

		function getQuestions(query) {
			$http.get('/api/search/question?search=' + query).then(function(questions) {
				vm.searchedQuestions = questions.data;
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
