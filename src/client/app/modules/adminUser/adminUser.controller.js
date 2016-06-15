(function() {
	'use strict';

	angular
		.module('admin.user')
		.controller('AdminUserController', AdminUserController);

	/* @ngInject */
	function AdminUserController(logger, $state) {
		var vm = this;
		vm.title = 'AdminQuestionController';
		vm.addTest = addTest;

		///////////////

		function addTest() {
			$state.go('adminTest');
		}
	}

})();
