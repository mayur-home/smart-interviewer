(function() {
	'use strict';

	angular
		.module('admin.question')
		.controller('AdminQuestionController', AdminQuestionController);

	/* @ngInject */
	function AdminQuestionController(logger, adminQuestionService) {
		var vm = this;
		var answerIdCounter = 0;

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
		vm.snippetSwitch = false;

		vm.modelName = '<div class="dropup"> ' +
		'<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" ' +
		' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dropup ' +
		' <span class="caret"></span> ' +
		' </button> <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"> ' +
		' <li><a href="#">Action</a></li> <li><a href="#">Another action</a></li> ' +
		' <li><a href="#">Something else here</a></li> <li role="separator" class="divider"></li>' +
		' <li><a href="#">Separated link</a></li> </ul> </div>';

		activate();

		////////////////

		function activate() {
			logger.success('Activated Question Master View.');
		}

		function submit() {
			vm.questionMaster.answer = angular.copy(vm.answers);

			// Make sure to send lowercase string for tags
			vm.questionMaster.tags = ['angularjs', 'java 123', 'java'];

			vm.questionMaster.snippet = vm.snippetSwitch ?
				htmlEncode(vm.questionMaster.snippet) : null;

			adminQuestionService.save(vm.questionMaster)
				.then(function() {
					vm.questionMaster = {};
					vm.answerModel = {};
					logger.success('Your record saved..!');
				});
		}

		function addAnswer() {
			var answer = {
				answer: vm.answerModel.answer,
				isCorrect: vm.answerModel.isCorrect === 'true',
				id: ++answerIdCounter
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

