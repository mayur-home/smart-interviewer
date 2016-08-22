(function() {
	'use strict';

	angular
		.module('activateUser')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'activateUser',
				config: {
					url: '/activateUser/:token',
					templateUrl: 'app/modules/activateUser/activateUser.html',
					controller: 'activateUserController',
					controllerAs: 'vm',
					title: 'activateUser'
				}
			}
		];
	}
})();
