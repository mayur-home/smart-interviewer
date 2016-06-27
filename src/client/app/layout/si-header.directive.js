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
			scope: {
				user: '=user'
			},
			templateUrl: 'app/layout/si-header.html'
		};

		/* @ngInject */
		function TopNavController(session, $rootScope, $state) {
			var vm = this;
			vm.logout = logout;

			//////////////

			function logout() {
				session.signout();
				$rootScope.$broadcast('logOut');
				$state.go('adminLogin');
			}
		}

		return directive;
	}
})();
