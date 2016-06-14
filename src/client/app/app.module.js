(function() {
	'use strict';

	angular
		.module('app', [
			'app.core',
			'app.widgets',
			'app.dashboard',
			'app.question',
			'app.layout'
		])
		// TODO - Need to move to seprate config file.
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('teal')
				.accentPalette('orange');
		});

})();
