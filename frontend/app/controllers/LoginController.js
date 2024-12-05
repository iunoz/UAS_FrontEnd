var app = angular.module('reShoesApp');

app.controller('LoginController', function ($scope, $http, $window) {
    $scope.user = {}; // Menyimpan data login
    $scope.isLoggedIn = !!localStorage.getItem('token'); // Cek apakah token ada di localStorage

    $scope.login = function () {
        const requestData = {
            email: $scope.user.email,
            password: $scope.user.password,
        };

        $http.post('http://localhost:3000/api/userRoutes/login', requestData)
            .then(function (response) {
                // Simpan token JWT di localStorage
                localStorage.setItem('token', response.data.token);

                // Perbarui status login
                $scope.isLoggedIn = true;

                // Redirect ke halaman utama setelah login berhasil
                alert("Login successful! Redirecting to the home page...");
                $window.location.href = '#!/home'; // Ke halaman utama
                $window.location.reload();
                
            })
            .catch(function (error) {
                alert("Login failed: " + (error.data?.error || "Unknown error"));
            });
    };

    $scope.logout = function () {
        // Hapus token dari localStorage
        localStorage.removeItem('token');

        // Perbarui status login
        $scope.isLoggedIn = false;

        // Redirect ke halaman login
        alert("Logged out successfully!");
        $window.location.href = '#!/login';
    };
});
