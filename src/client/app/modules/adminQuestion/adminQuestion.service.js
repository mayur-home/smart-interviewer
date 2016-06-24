(function() {
	'use strict';

	angular
		.module('admin.question')
		.factory('adminQuestionService', adminQuestionService);

	/* @ngInject */
	function adminQuestionService($http) {
		var service = {
			save: save
		};

		return service;

		////////////////

		function save(question) {
			return $http.post('api/question', question);
		}
	}

})();
