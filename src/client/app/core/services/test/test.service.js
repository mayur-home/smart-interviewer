(function() {
	'use strict';

	angular
		.module('core.test')
		.factory('testService', testService);

	/* @ngInject */
	function testService(logger) {
		var testId, testType, questions;
		var answers = [];
		var service = {
			setId: setId,
			getId: getId,
			setTestType: setTestType,
			recordAnswer: recordAnswer,
			setQuestions: setQuestions,
			getNextQuestion: getNextQuestion
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

		function setQuestions(questionList) {
			questions = _(questionList);
		}

		function getNextQuestion() {
			return questions.next();
		}

		function recordAnswer(answer) {
			// { id: 'questionId', isTrue: 'status'}
			answers.push(answer);
		}
	}
})();
