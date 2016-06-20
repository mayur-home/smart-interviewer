(function() {
	'use strict';

	angular
		.module('core.session')
		.factory('session', sessionService);

	/* @ngInject */
	function sessionService(logger) {
		var sessionData = {};
		var service = {
			set: set,
			get: get
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
	}
})();
