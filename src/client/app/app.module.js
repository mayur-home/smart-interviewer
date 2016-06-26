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
		// TODO - Need to move to seprate config file.
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('green');
		});

})();
