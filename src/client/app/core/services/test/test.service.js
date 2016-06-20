(function() {
	'use strict';

	angular
		.module('core.test')
		.factory('testService', testService);

	/* @ngInject */
	function testService(session, $http, logger) {
		var questions = {};
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

		// This will be used in case of only fixed test case
		function getQuestions() {
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

			console.log(data);
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
