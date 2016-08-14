(function() {
	'use strict';

	angular
		.module('admin.testReport')
		.controller('AdminTestReportController', AdminTestReportController);

	/* @ngInject */
	function AdminTestReportController(testData, $http, $stateParams, logger) {
		var vm = this;
		vm.testInfo = testData.testInfo;
		vm.report = testData.report;
		vm.markStatus = markStatus;
		activate();

		//////////////

		function activate() {
			generateChartData();
			logger.info('Activated Test Report Controller Activated');
		}

		function generateChartData() {
			var result = _.countBy(testData.report, 'isCorrect');
			// this object will be passed to chart directive.
			vm.pieChartSeries = [{
				name: 'Test Results',
				colorByPoint: true,
				data: [{
					name: 'Correct',
					y: result.true || 0
				}, {
					name: 'Wrong',
					y: result.false || 0
				}]
			}];
		}

		function markStatus(status, questionId, index) {
			var params = {
				id: $stateParams.id,
				questionId: questionId,
				status: status
			};

			$http.post('api/userTest/setQuestionStatus', params)
				.then(function(response) {
					vm.report[index].isCorrect = response.data.status;
					generateChartData();
				});
		}
	}

})();
