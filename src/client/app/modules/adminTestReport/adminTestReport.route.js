(function() {
	'use strict';

	angular
		.module('admin.testReport')
		.run(appRun);

	/* @ngInject */
	function appRun($stateParams, routerHelper) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'adminTestReport',
					config: {
						url: '/admin/userTest/:id/report',
						templateUrl: 'app/modules/adminTestReport/adminTestReport.html',
						controller: 'AdminTestReportController',
						controllerAs: 'vm',
						title: 'Admin Test Report',
						params: {
							id: $stateParams.id
						},
						resolve: {
							/* @ngInject */
							testData: function($http, $stateParams, $q, logger) {
								return $http.get('/api//userTest/' + $stateParams.id + '/report')
									.then(testDataSuccess)
									.catch(testDataFailure);

								function testDataSuccess(data) {
									return data.data;
								}

								function testDataFailure(error) {
									logger.error('Error in fetching test data', error);
									return $.reject(error);
								}
							}
						}
					}
				}
			];
		}
	}

})();
