(function() {
	'use strict';

	angular
		.module('admin.test')
		.controller('AdminTestController', AdminTestController);

	/* @ngInject */
	function AdminTestController($scope, $http, test, logger) {
		var vm = this;
		console.log(test);
		var testId = test._id;
		vm.title = 'AdminTestController';
		vm.addQuestion = addQuestion;

		$scope.$watch('vm.search', function(newVal, oldVal) {
			getQuestions(newVal);
		});

		/////////////////

		function getQuestions(query) {
			$http.get('/api/search/question?search=' + query).then(function(questions) {
				console.log(questions);
				vm.questions = questions.data;
			});
		}

		function addQuestion(id) {
			$http.post('/api/test/question',
				{
					"_id": testId,
					"questionId": id
				}, function(data) {
				console.log('Added question');
			});
		}
	}
})();
