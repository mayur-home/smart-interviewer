(function() {
	'use strict';

	angular
		.module('app.question')
		.run(appRun);

	appRun.$inject = ['routerHelper'];
	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());
	}

	function getStates() {
		return [
			{
				state: 'adminQuestion',
				config: {
					url: '/admin/question',
					templateUrl: 'app/modules/adminQuestion/adminQuestion.html',
					controller: 'AdminQuestionController',
					controllerAs: 'vm',
					title: 'Admin Question'
				}
			}
		];
	}
})();
