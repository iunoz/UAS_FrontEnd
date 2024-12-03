angular.module('reShoesApp')
    .controller('RegisterController', function($scope, $http, $location) {
        $scope.user = {};  // Membuat objek untuk menyimpan data user

        // Fungsi untuk menangani pengiriman form
        $scope.register = function() {
            // Periksa apakah password dan konfirmasi password cocok
            if ($scope.user.password !== $scope.user.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Log data untuk memeriksa apakah data sudah benar
            console.log('Sending data to backend:', {
                nickname: $scope.user.nickname,
                email: $scope.user.email,
                password: $scope.user.password
            });

            // Kirim data ke server menggunakan $http
            $http.post('http://localhost:3000/api/users/register', {
                nickname: $scope.user.nickname,
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function(response) {
                alert("Registration successful!");
                $location.path('/login'); // Redirect ke login
            }).catch(function(error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            });
        };
    });
