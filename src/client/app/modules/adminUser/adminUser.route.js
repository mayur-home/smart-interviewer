(function() {
	'use strict';

	angular
		.module('admin.user')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'adminUser',
					config: {
						url: '/admin/user',
						templateUrl: 'app/modules/adminUser/adminUser.html',
						controller: 'AdminUserController',
						controllerAs: 'vm',
						title: 'Admin User',
						authenticate: true
					}
				}
			];
		}
	}

})();
