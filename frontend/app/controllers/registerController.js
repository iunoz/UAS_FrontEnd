// register.js
angular.module('reShoesApp')
    .controller('RegisterController', function($scope, $location) {
        $scope.user = {};  // Membuat objek untuk menyimpan data user

        // Fungsi untuk menangani pengiriman form
        $scope.register = function() {
            // Periksa apakah password dan konfirmasi password cocok
            if ($scope.user.password !== $scope.user.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Simpan atau kirim data ke server (misalnya menggunakan $http)
            console.log("User registered:", $scope.user);

            // Redirect ke halaman login setelah registrasi berhasil
            $location.path('/login');
        };
    });
