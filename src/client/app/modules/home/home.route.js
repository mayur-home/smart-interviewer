(function() {
	'use strict';

	angular
		.module('app.home')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'home',
				config: {
					url: '/',
					templateUrl: 'app/modules/home/home.html',
					controller: 'HomeController',
					controllerAs: 'vm',
					title: 'Home'
				}
			}
		];
	}
})();
