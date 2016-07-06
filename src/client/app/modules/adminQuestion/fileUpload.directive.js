(function() {
	'use strict';

	angular
		.module('admin.question')
		.directive('fileUpload', fileUploadDirective);

	function fileUploadDirective() {
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'app/modules/adminQuestion/fileUpload.html',
			controller: function($scope, $element, $http, logger) {
				$scope.doUpload = function() {
					var formData = new FormData();
					var file = $element.find('input[type="file"]')[0].files[0];

					formData.append('file', file);

					$http.post('/api/question/file', formData, {
							transformRequest: angular.identity,
							headers: {
								'Content-Type': undefined
							}
						})
						.then(uploadSuccess)
						.catch(uploadFailure);

					function uploadSuccess() {
						logger.info('File uploaded successfully');
					}

					function uploadFailure() {
						logger.error('Error in file upload');
					}
				};
			}
		};
	}
})();
