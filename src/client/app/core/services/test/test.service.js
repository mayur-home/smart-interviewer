(function() {
	'use strict';

	angular
		.module('core.test')
		.factory('testService', testService);

	/* @ngInject */
	function testService($http, logger) {
		var testId, userTestId, testType, questions;
		var service = {
			setId: setId,
			getId: getId,
			setUserTestId: setUserTestId,
			getUserTestId: getUserTestId,
			setTestType: setTestType,
			recordAnswer: recordAnswer,
			setQuestions: setQuestions,
			getNextQuestion: getNextQuestion,
			generateReport: generateReport
		};

		return service;

		////////////////////

		function setTestType(type) {
			// automated/prepared
			testType = type;
		}

		function setId(id) {
			// session.set('test.id', id);
			testId = id;
		}

		function getId(id) {
			// session.set('test.id', id);
			return testId;
		}

		function setUserTestId(id) {
			userTestId = id;
		}

		function getUserTestId() {
			return userTestId;
		}

		function setQuestions(questionList) {
			questions = _(questionList);
		}

		function getNextQuestion() {
			return questions.next();
		}

		function recordAnswer(answer) {
			return $http.post('/api/userTest/recordAnswer', {
				id: userTestId,
				questionId: answer.questionId,
				answerId: answer.answerId
			});
		}

		function generateReport() {

		}
	}
})();
