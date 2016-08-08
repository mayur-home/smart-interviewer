(function() {
	'use strict';

	angular
		.module('core.test')
		.factory('testService', testService);

	/* @ngInject */
	function testService($http, $q, logger) {
		var testId, userTestId, testType, questions, primaryTags, questionCounter = 0, currentWeightage = 1,
			questionCounterPerWeight = {
				1: {
					counter: 0,
					thresholds: [
						{
							maxQuestion: 10,
							requiredTrue: 8
						}, {
							maxQuestion: 15,
							requiredTrue: 10
						}
					]
				},
				2: {
					counter: 0,
					thresholds: [
						{
							maxQuestion: 10,
							requiredTrue: 8
						}, {
							maxQuestion: 15,
							requiredTrue: 10
						}
					]
				},
				3: {
					counter: 0,
					thresholds: [
						{
							maxQuestion: 3,
							requiredTrue: 1
						}, {
							maxQuestion: 5,
							requiredTrue: 2
						}
					]
				},
				4: {
					counter: 0,
					thresholds: [
						{
							maxQuestion: 10,
							requiredTrue: 7
						}, {
							maxQuestion: 15,
							requiredTrue: 10
						}
					]
				},
				5: {
					counter: 0,
					thresholds: [
						{
							maxQuestion: 10,
							requiredTrue: 7
						}, {
							maxQuestion: 15,
							requiredTrue: 10
						}
					]
				}
			}, thresholdCounter = 0;

		var service = {
			setId: setId,
			getId: getId,
			setUserTestId: setUserTestId,
			getUserTestId: getUserTestId,
			setPrimaryTags: setPrimaryTags,
			getPrimaryTag: getPrimaryTag,
			setTestType: setTestType,
			getType: getType,
			recordAnswer: recordAnswer,
			setQuestions: setQuestions,
			getNextQuestion: getNextQuestion,
			getNextSmartQuestion: getNextSmartQuestion,
			incrementQuestionCounter: incrementQuestionCounter,
			resetQuestionCounter: resetQuestionCounter
		};

		return service;

		////////////////////

		function setTestType(type) {
			// smart/fixed
			testType = type;
		}

		function getType() {
			return testType;
		}

		function setId(id) {
			// session.set('test.id', id);
			testId = id;
		}

		function getId(id) {
			// session.set('test.id', id);
			return testId;
		}

		function setPrimaryTags(tags) {
			primaryTags = tags;
		}

		function getPrimaryTag() {
			return primaryTags;
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
			answer.id = userTestId;

			return $http.post('/api/userTest/recordAnswer', answer);
		}

		function getNextSmartQuestion() {
			var url = '/api/question/next?weightage=' + currentWeightage + '&primaryTags=' + primaryTags + '&userTestId=' + userTestId;

			return $http.get(url)
				.then(function(data) {
					var question = data.data;
					if (question.errors && question.errors[0].reasonCode === 'NO_NEXT_QUESTION_WITH_TAG_WEIGHTAGE') {
						logger.error('No more questions remaining for this weightage');
						console.log(currentWeightage);
						if (currentWeightage >= 5) {
							return $q.reject({
								noMoreWeightage: true
							});
						}
						incrementWeightage();
						return $q.reject();
					}
					processTagAndWeightage();
					return {
						id: question._id
					};
				})
				.catch(function(err) {
					return $q.reject(err);
				});
		}

		function resetQuestionCounter() {
			questionCounter = 0;
		}

		function incrementQuestionCounter() {
			questionCounter++;
		}

		function incrementWeightage() {
			currentWeightage++;
			thresholdCounter = 0;
			console.log('incremented currentWeightage', currentWeightage);
		}

		function processTagAndWeightage() {
			questionCounterPerWeight[currentWeightage].counter++;

			if (questionCounterPerWeight[currentWeightage].counter >=
				questionCounterPerWeight[currentWeightage].thresholds[thresholdCounter].maxQuestion) {

				var checkStatusUrl = 'api/userTest/' + userTestId + '/checkStatus?requiredCorrect=' +
					questionCounterPerWeight[currentWeightage].thresholds[thresholdCounter].requiredTrue +
					'&weightage=' + currentWeightage;

				$http.get(checkStatusUrl)
					.then(function (response) {
						if(response.data.goAhead) {
							incrementWeightage();
						} else {
							thresholdCounter++;
							if (thresholdCounter >= (questionCounterPerWeight[currentWeightage].thresholds.length)) {
								incrementWeightage();
							}
						}
					})
					.catch(function(err) {
						logger.error('error in get status', err);
					});
			}

		}
	}
})();
