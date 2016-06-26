(function() {
	'use strict';

	angular
		.module('testComplete')
		.controller('TestCompleteController', TestCompleteController);

	/* @ngInject */
	function TestCompleteController(testService, logger) {
		var vm = this;
		vm.title = 'TestCompleteController';
	}

})();
