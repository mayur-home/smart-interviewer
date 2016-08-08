(function() {
	'use strict';

	angular
		.module('admin.testReport')
		.controller('AdminTestReportController', AdminTestReportController);

	/* @ngInject */
	function AdminTestReportController(testData, $http, $stateParams, logger) {
		var vm = this;
		vm.testData = testData;
		vm.markStatus = markStatus;
		activate();

		//////////////

		function activate() {
			logger.info('Activated Test Report Controller Activated');
		}

		function markStatus(status, questionId, index) {
			var params = {
				id: $stateParams.id,
				questionId: questionId,
				status: status
			};

			$http.post('api/userTest/setQuestionStatus', params)
				.then(function(response) {
					vm.testData[index].isCorrect = response.data.status;
				});
		}
	}

})();
