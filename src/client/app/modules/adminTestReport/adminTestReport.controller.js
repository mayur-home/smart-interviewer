(function() {
	'use strict';

	angular
		.module('admin.testReport')
		.controller('AdminTestReportController', AdminTestReportController);

	/* @ngInject */
	function AdminTestReportController(testData, logger) {
		var vm = this;
		vm.testData = testData;

		activate();

		//////////////

		function activate() {
			logger.info('Activated Test Report Controller Activated');
		}
	}

})();
