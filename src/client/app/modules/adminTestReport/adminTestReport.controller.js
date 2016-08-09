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
			generatePieChart();
			logger.info('Activated Test Report Controller Activated');
		}

		function generatePieChart() {
			var result = _.countBy(testData, 'isCorrect');
			$('#test-pie-chart-container').highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: 'Summary Test Result'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						}
					}
				},
				series: [{
					name: 'Test Results',
					colorByPoint: true,
					data: [{
						name: 'Correct',
						y: result.true
					}, {
						name: 'Wrong',
						y: result.false
					}]
				}]
			});
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
					generatePieChart();
				});
		}
	}

})();
