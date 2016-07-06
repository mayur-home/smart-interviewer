(function() {
	'use strict';

	angular
		.module('core.adminTest')
		.factory('adminTestService', adminTestService);

	/* @ngInject */
	function adminTestService(session, $http, logger) {
		var type = 'fixed'; // may be automated etc.
		var service = {
			getId: getId,
			setId: setId,
			getQuestions: getQuestions,
			addQuestion: addQuestion,
			removeQuestion: removeQuestion
		};

		return service;

		////////////////

		function getId() {
			var id = session.get('test.id');
			if (!id) {
				logger.error('Test does not exist in session');
				return;
			}
			return id;
		}

		function setId(id) {
			session.set('test.id', id);
		}

		function getQuestions() {
			var questions;
			return $http.get('/api/test/questions?testId=' + getId())
				.then(getQuestionsSuccess)
				.catch(getQuestionsFailure);

			function getQuestionsSuccess(questionsList) {
				questions = questionsList;
				return questions;
			}

			function getQuestionsFailure(err) {
				logger.error('Error in get questions', err);
				return err;
			}
		}

		function addQuestion(questionId) {
			return $http.post('/api/test/question', {
					testId: getId(),
					questionId: questionId
				})
				.then(addQuestionSuccess)
				.catch(addQuestionFailure);

			function addQuestionSuccess(question) {
				return question;
			}

			function addQuestionFailure(err) {
				logger.error('Error in add question', err);
				return err;
			}
		}

		function removeQuestion(questionId) {
			var data = $.param({
				testId: getId(),
				questionId: questionId
			});

			return $http.delete('/api/test/question?' + data)
				.then(addQuestionSuccess)
				.catch(addQuestionFailure);

			function addQuestionSuccess(question) {
				return question;
			}

			function addQuestionFailure(err) {
				logger.error('Error in add question', err);
				return err;
			}
		}
	}
})();
