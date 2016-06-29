(function() {
	'use strict';

	angular
		.module('core.session')
		.factory('session', sessionService);

	/* @ngInject */
	function sessionService($q, $http, $rootScope, $window, logger) {
		var authUrl = '/api/auth/session';
		var service = {
			set: set,
			get: get,
			remove: remove,
			signin: signin,
			signout: signout,
			getLoginData: getLoginData
		};

		return service;

		/////////////

		function set(key, value) {
			$window.sessionStorage.setItem(key, value);
		}

		function get(key) {
			return $window.sessionStorage.getItem(key);
		}

		function remove(key) {
			$window.sessionStorage.removeItem(key);
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
				set('user', JSON.stringify(user));
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
				.then(getSessionSuccess)
				.catch(getSessionFailure);

			function getSessionSuccess(response) {
				if (response.data._id) {
					var user = response.data;
					set('user', JSON.stringify(user));
					defer.resolve(user);
				}
			}

			function getSessionFailure(error) {
				logger.error('User is unauthorised', error);
				defer.reject(error);
			}

			return defer.promise;
		}
	}
})();
