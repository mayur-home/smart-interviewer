(function() {
	'use strict';

	angular
		.module('@@module')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: '@@module',
				config: {
					url: '/@@module',
					templateUrl: 'app/modules/@@module/@@module.html',
					controller: '@@controller',
					controllerAs: 'vm',
					title: '@@module'
				}
			}
		];
	}
})();
