(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('ShellController', ShellController);

	/* @ngInject */
	function ShellController(config, $rootScope, session, $state, logger) {
		var vm = this;

		$rootScope.$on('login', loggedIn);
		$rootScope.$on('logOut', loggedOut);

		activate();

		/////////////////

		function activate() {
			logger.success(config.appTitle + ' loaded!', null);
			session.getLoginData()
				.then(function(user) {
					vm.username = user.email;
				})
				.catch(function() {
					session.remove('user');
					// $state.go('adminLogin');
				});
		}

		function loggedIn(event, user) {
			vm.username = user.email;
		}

		function loggedOut() {
			vm.username = null;
		}

	}
})();
