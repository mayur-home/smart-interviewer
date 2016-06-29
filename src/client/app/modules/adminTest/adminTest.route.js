(function() {
	'use strict';

	angular
		.module('admin.test')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper, $http, $q) {
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
						authenticate: true,
						resolve: {
							/* @ngInject */
							testData: function($http, $q) {
								var defer = $q.defer();

								$http.post('/api/test')
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
