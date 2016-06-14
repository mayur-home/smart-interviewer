(function() {
	'use strict';

	angular
		.module('app', [
			'app.core',
			'app.widgets',
			'app.admin',
			'app.dashboard',
			'app.layout'
		])
		// TODO - Need to move to seprate config file.
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('teal')
				.accentPalette('orange');
		});

})();
