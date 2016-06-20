(function() {
	'use strict';

	angular
		.module('admin.question')
		.controller('AdminQuestionController', AdminQuestionController);

	/* @ngInject */
	function AdminQuestionController(logger, adminQuestionService) {
		var vm = this;
		vm.title = 'AdminQuestionController';
		// TODO - Need to fetch from API.
		vm.questionType = [
			{text: 'Multi Select Question', value: 'MSQ'},
			{text: 'Single Select Question', value: 'SSQ'},
			{text: 'Descriptive Question', value: 'DQ'}
		];
		vm.weightage = [
			{text: 'Very Hard', value: 5},
			{text: 'Hard', value: 4},
			{text: 'Moderate', value: 3},
			{text: 'Easy', value: 2},
			{text: 'Very Easy', value: 1}
		];
		vm.submit = submit;
		vm.addAnswer = addAnswer;
		vm.removeAnswer = removeAnswer;
		vm.answers = [];

		activate();

		////////////////

		function activate() {
			logger.success('Activated Question Master View.');
		}

		function submit() {
			vm.questionMaster.answer = angular.copy(vm.answers);

			// Make sure to send lowercase string for tags
			vm.questionMaster.tags = ['angularjs', 'java 123', 'java'];

			adminQuestionService.save(vm.questionMaster)
				.then(function() {
					vm.questionMaster = {};
					logger.success('Your record saved..!');
				});
		}

		function addAnswer() {
			var answer = {
				answer: vm.answerModel.answer,
				isCorrect: vm.answerModel.isCorrect === 'true'
			};
			vm.answers.push(answer);
			vm.answerModel = {};
			logger.success('Answer added.!');
		}

		function removeAnswer($index) {
			vm.answers.splice($index, 1);
			logger.warning('Answer removed');
		}
	}

})();

