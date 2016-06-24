(function() {
	'use strict';

	angular
		.module('test')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'test',
					config: {
						url: '/test/:id',
						templateUrl: 'app/modules/test/test.html',
						controller: 'testController',
						controllerAs: 'vm',
						title: 'Test',
						resolve: {
							/* @ngInject */
							test: function($stateParams, $http, logger) {
								return $http.get('/api/userTest/' + $stateParams.id)
									.then(getTestSuccess)
									.catch(getTestFailure);

								function getTestSuccess(data) {
									console.log(data.data);
									return data.data;
								}

								function getTestFailure(err) {
									logger.error(err);
								}
							}
						}
					}
				}
			];
		}
	}

})();
