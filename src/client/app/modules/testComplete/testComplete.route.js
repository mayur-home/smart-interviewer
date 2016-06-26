(function() {
	'use strict';

	angular
		.module('testComplete')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'testComplete',
					config: {
						url: '/test/:testId/complete',
						templateUrl: 'app/modules/testComplete/testComplete.html',
						controller: 'TestCompleteController',
						controllerAs: 'vm',
						title: 'Test Complete'
					}
				}
			];
		}
	}

})();
