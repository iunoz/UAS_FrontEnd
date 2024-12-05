console.log('LoginController loaded');
var app = angular.module('reShoesApp'); // Tambahkan array jika modul baru
app.controller('LoginController', function ($scope, $http) {
    $scope.user = {}; // Menyimpan data login

    $scope.login = function () {
        console.log("Login function called"); // Debugging log
        const requestData = {
            email: $scope.user.email,
            password: $scope.user.password,
        };

        $http.post('http://localhost:3000/api/userRoutes/login', requestData)
            .then(function (response) {
                console.log("Login successful:", response.data); // Log respons sukses
                alert("Login successful! Welcome, " + response.data.user.username);
                window.location.href = '#!/home'; // Redirect ke halaman home
            })
            .catch(function (error) {
                console.error("Login failed:", error); // Log respons error
                alert("Login failed: " + (error.data?.error || "Unknown error"));
            });
    };
});
