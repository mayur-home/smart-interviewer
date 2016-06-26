(function() {
	'use strict';

	angular
		.module('admin.login')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'adminLogin',
				config: {
					url: '/admin/login',
					templateUrl: 'app/modules/adminLogin/adminLogin.html',
					controller: 'AdminLoginController',
					controllerAs: 'vm',
					title: 'Admin Login'
				}
			}
		];
	}
})();
