angular.module('reShoesApp').controller('ContactController', function($scope, $http) {
    $scope.formData = {};

    $scope.submitForm = function(form) {
        if (form.$valid) {
            $http.post('/api/contact-support', $scope.formData)
                .then(function(response) {
                    console.log('Message sent:', response.data);
                    // Show success modal
                    const modal = new bootstrap.Modal(document.getElementById('successModal'));
                    modal.show();
                })
                .catch(function(error) {
                    console.error('Error sending message:', error);
                });
        }
    };
});
