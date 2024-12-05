var app = angular.module('reShoesApp');

app.controller('RegisterController', function ($scope, $http) {
    $scope.user = {}; // Menyimpan data form

    $scope.register = function () {
        console.log("Register function called"); // Debugging log
        console.log("User Data:", $scope.user); // Log data user yang diinputkan

        // Validasi apakah password dan confirmPassword cocok
        if ($scope.user.password !== $scope.user.confirmPassword) {
            console.error("Passwords do not match!"); // Log error
            alert("Passwords do not match!");
            return;
        }

        // Kirim data ke backend untuk membuat user
        const requestData = {
            username: $scope.user.username,
            nickname: $scope.user.username, // Gunakan username sebagai nickname default
            email: $scope.user.email,
            password: $scope.user.password,
        };

        // Kirim data ke backend menggunakan POST request
        $http.post('http://localhost:3000/api/userRoutes/users', requestData)
            .then(function (response) {
                console.log("Registration successful:", response.data); // Log respons sukses
                alert("Registration successful! Welcome, " + response.data.username);
                window.location.href = '#!/login.html'; // Redirect ke halaman login setelah berhasil
            })
            .catch(function (error) {
                console.error("Registration failed:", error); // Log respons error
                alert("Registration failed: " + (error.data?.error || "Unknown error"));
            });
    };
});
