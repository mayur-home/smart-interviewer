(function() {
	'use strict';

	angular
		.module('verifyToken')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'verifyToken',
				config: {
					url: '/verifyToken/:token',
					templateUrl: 'app/modules/verifyToken/verifyToken.html',
					controller: 'verifyTokenController',
					controllerAs: 'vm',
					title: 'verifyToken'
				}
			}
		];
	}
})();
