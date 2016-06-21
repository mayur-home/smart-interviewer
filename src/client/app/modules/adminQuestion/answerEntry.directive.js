(function() {
	'use strict';

	angular
		.module('admin.question')
		.directive('answerEntry', answerEntry);

	/* @ngInject */
	function answerEntry() {
		var directive = {
			restrict: 'E',
			scope: true,
			templateUrl: 'app/modules/adminQuestion/answerEntry.html'
		};
		return directive;
	}

})();

