(function() {
	'use strict';

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	/* @ngInject */
	function HomeController(logger, session) {
		var vm = this;
		vm.title = 'Home';

		activate();

		function activate() {
			if (session.get('user')) {
				vm.user = JSON.parse(session.get('user'));
			}
			logger.info('Activated Home View');
		}
	}
})();
