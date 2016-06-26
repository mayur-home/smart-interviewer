(function() {
	'use strict';

	angular
		.module('admin.registration')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'adminRegistration',
				config: {
					url: '/admin/register',
					templateUrl: 'app/modules/adminRegistration/adminRegistration.html',
					controller: 'AdminRegistrationController',
					controllerAs: 'vm',
					title: 'Admin Signup'
				}
			}
		];
	}
})();
