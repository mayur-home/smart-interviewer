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
		vm.questionType = ['Multi Select Question', 'Single Select Question', 'Descriptive Question'];
		vm.weightage = [
			{text: 'Very Hard', value: 5},
			{text: 'Hard', value: 4},
			{text: 'Moderate', value: 3},
			{text: 'Easy', value: 2},
			{text: 'Very Easy', value: 1}
		];
		vm.submit = submit;

		activate();

		////////////////

		function activate() {
			logger.success('Activated Question Master View.');
		}

		function submit() {
			adminQuestionService.save(vm.questionMaster)
				.then(function() {
					logger.success('Your record saved..!');
				});
		}
	}

})();

