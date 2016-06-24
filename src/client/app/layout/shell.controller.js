(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('ShellController', ShellController);

	/* @ngInject */
	function ShellController(config, logger) {
		var vm = this;

		activate();

		function activate() {
			logger.success(config.appTitle + ' loaded!', null);
		}

	}
})();
