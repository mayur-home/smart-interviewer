(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('siHeader', siHeader);

	/* @ngInject */
	function siHeader() {
		var directive = {
			bindToController: true,
			controller: TopNavController,
			controllerAs: 'vm',
			restrict: 'EA',
			scope: {},
			templateUrl: 'app/layout/si-header.html'
		};

		/* @ngInject */
		function TopNavController() {
			var vm = this;
		}

		return directive;
	}
})();
