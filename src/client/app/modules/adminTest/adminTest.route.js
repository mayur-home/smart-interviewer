(function() {
	'use strict';

	angular
		.module('admin.test')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper, $stateParams) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'adminTest',
					config: {
						url: '/admin/test',
						templateUrl: 'app/modules/adminTest/adminTest.html',
						controller: 'AdminTestController',
						controllerAs: 'vm',
						title: 'Admin Test',
						params: {
							testName: $stateParams.testName,
							userId: $stateParams.userId
						},
						authenticate: true,
						resolve: {
							/* @ngInject */
							testData: function($http, $q, $stateParams) {
								console.log($stateParams);
								var defer = $q.defer();

								$http.post('/api/test', {
									name: $stateParams.testName,
									creator: $stateParams.userId
								})
									.then(function(test) {
										defer.resolve(test.data);
									})
									.catch(function(err) {
										defer.reject(err);
									});

								return defer.promise;
							}
						}
					}
				}
			];
		}
	}

})();
