(function() {
	'use strict';

	angular
		.module('app', [
			'app.core',
			'app.widgets',
			'app.home',
			'admin.question',
			'admin.user',
			'admin.test',
			'admin.login',
			'admin.registration',
			'app.layout',
			'test',
			'question',
			'testComplete'
		])
		.config(config)
		.run(run);

	// TODO - Need to move to seprate config file.
	/* @ngInject */
	function config($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('green');
	}

	// TODO - Need to move to seprate run file.
	/* @ngInject */
	function run($rootScope, session, $state) {
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams, options) {
				// if user is exist in Session storage then do not make a
				// call to loginData service - to reduce API call on each and every
				// authentication required pages
				if (!session.get('user') && toState.authenticate) {
					session.getLoginData()
						.catch(function() {
							$state.go('adminLogin');
						});
				}
			});
	}

})();
