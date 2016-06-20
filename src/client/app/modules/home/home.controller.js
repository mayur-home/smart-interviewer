(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	/* @ngInject */
	function HomeController(logger) {
		var vm = this;
		vm.title = 'Home';

		activate();

		function activate() {
			logger.info('Activated Home View');
		}
	}
})();
