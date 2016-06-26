(function() {
	'use strict';

	angular
		.module('core.session')
		.factory('session', sessionService);

	/* @ngInject */
	function sessionService($q, $http, $rootScope, logger) {
		var sessionData = {};
		var authUrl = '/api/auth/session';
		var service = {
			set: set,
			get: get,
			signin: signin,
			signout: signout,
			getLoginData: getLoginData
		};

		return service;

		/////////////

		function set(key, value) {
			sessionData[key] = value;
		}

		function get(key) {
			if (!sessionData[key]) {
				logger.error('Key does not exist in session');
				return;
			}
			return sessionData[key];
		}

		function signin(user) {
			var defer = $q.defer();

			$http.post(authUrl, {
				email: user.email,
				password: user.password,
				rememberMe: user.rememberMe
			}).then(signinSuccess, signinFailure);

			function signinSuccess(response) {
				var user = response.data;
				set('user', user.email);
				$rootScope.$broadcast('login', user);
				defer.resolve(user);
			}

			function signinFailure(err) {
				defer.reject(err.data);
			}

			return defer.promise;
		}

		function signout() {
			$http.delete(authUrl)
				.then(function() {
					console.log('session deleted');
					remove('user');
				});
		}

		function getLoginData() {
			var defer = $q.defer();

			$http.get(authUrl)
				.then(getSessionSuccess);

			function getSessionSuccess(response) {
				if (response.data._id) {
					var user = response.data;
					set('user', user.email);
					defer.resolve(user);
				}
			}

			return defer.promise;
		}
	}
})();
