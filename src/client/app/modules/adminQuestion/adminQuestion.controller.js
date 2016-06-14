(function() {
	'use strict';

	angular
		.module('app.question')
		.controller('AdminQuestionController', AdminQuestionController);

	/* @ngInject */
	function AdminQuestionController(logger) {
		var vm = this;
		vm.title = 'AdminQuestionController';

		activate();

		////////////////

		function activate() {
			logger.success('Activated Question Master View.');
		}
	}

})();

