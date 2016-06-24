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
			console.log(vm.answer);
			$state.go('question', {testId: $stateParams.testId, id: testService.getNextQuestion().value});
		}

		function recordAnswer() {

		}
	}

})();
