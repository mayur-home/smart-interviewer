(function() {
	'use strict';

	angular
		.module('app.widgets')
		.directive('siPieChart', siPieChart);

	/* @ngInject */
	function siPieChart() {
		var directive = {
			restrict: 'E',
			scope: {
				id: '@',
				titleText: '@',
				series: '=',
				tooltipPointFormat: '@',
				plotDataLabelsFormat: '@'
			},
			templateUrl: 'app/widgets/si-pie-chart/si-pie-chart.html',
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			$('#' + scope.id).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: scope.titleText
				},
				tooltip: {
					pointFormat: scope.tooltipPointFormat
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: scope.plotDataLabelsFormat,
							style: {
								color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
						}
					}
				},
				series: scope.series
			});
		}
	}
})();
