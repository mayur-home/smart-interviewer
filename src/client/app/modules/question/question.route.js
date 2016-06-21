(function() {
	'use strict';

	angular
		.module('question')
		.run(appRun);

	/* @ngInject */
	function appRun(routerHelper) {
		routerHelper.configureStates(getStates());

		function getStates() {
			return [
				{
					state: 'question',
					config: {
						url: '/test/:testId/question/:id',
						templateUrl: 'app/modules/question/question.html',
						controller: 'QuestionController',
						controllerAs: 'vm',
						title: 'Question',
						resolve: {
							/* @ngInject */
							question: function($stateParams, $http, logger) {
								console.log($stateParams);
								return $http.get('/api/question?id=' + $stateParams.id)
									.then(questionSuccess)
									.catch(questionFailure);

								function questionSuccess(data) {
									console.log(data.data);
									return data.data;
								}

								function questionFailure(err) {
									logger.error(err);
								}
							}
						}
					}
				}
			];
		}
	}

})();
