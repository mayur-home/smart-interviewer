(function() {
	'use strict';

	angular
		.module('app.core', [
			'ngAnimate', 'ngSanitize',
			'blocks.exception', 'blocks.logger', 'blocks.router',
			'ui.router', 'ngplus', 'ngMessages',
			'core.session',
			'core.adminTest',
			'core.test'
		]);
})();
