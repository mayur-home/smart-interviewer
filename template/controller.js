(function() {
	'use strict';

	angular
		.module('@@module')
		.controller('@@controller', @@controller);

	/* @ngInject */
	function @@controller(logger) {
		var vm = this;
		vm.title = '@@module';

		activate();

		function activate() {
			logger.info('Activated @@module View');
		}
	}
})();
