(function() {
	'use strict';

	angular
		.module('app', [
			'app.core',
			'app.widgets',
			'app.home',
			'admin.question',
			'admin.user',
			'admin.test',
			'admin.login',
			'admin.registration',
			'admin.testReport',
			'app.layout',
			'verifyToken',
			'activateUser',
			'test',
			'question',
			'resetPassword',
			'testComplete',
			'ngCkeditor',
			'ngTagsInput'
		])
		.run(run)
		.directive('snippet', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
			return {
				restrict: 'E',
				template: '<pre><code ng-transclude></code></pre>',
				replace: true,
				transclude: true,
				link: function (scope, elm) {
					var tmp = htmlDecode($interpolate(elm.find('code').text())(scope));
					elm.find('code').html(hljs.highlightAuto(tmp).value);
				}
			};
		}]);

	// TODO - Need to move to seprate run file.
	/* @ngInject */
	function run($rootScope, session, $state) {
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams, options) {
				// if user is exist in Session storage then do not make a
				// call to loginData service - to reduce API call on each and every
				// authentication required pages
				if (!session.get('user') && toState.authenticate) {
					session.getLoginData()
						.catch(function() {
							$state.go('adminLogin');
						});
				}
			});
	}

})();
