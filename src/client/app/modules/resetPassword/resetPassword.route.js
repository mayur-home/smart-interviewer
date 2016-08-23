(function() {
	'use strict';

	angular
		.module('resetPassword')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'resetPassword',
				config: {
					url: '/resetPassword',
					templateUrl: 'app/modules/resetPassword/resetPassword.html',
					controller: 'ResetPasswordController',
					controllerAs: 'vm',
					title: 'Reset Password'
				}
			}
		];
	}
})();
