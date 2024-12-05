var app = angular.module('reShoesApp');

app.controller('ProfileController', function ($scope, $http, $window) {
    const token = localStorage.getItem('token'); // Ambil token JWT dari localStorage

    // Redirect ke login jika token tidak ditemukan
    if (!token) {
        alert("You are not logged in. Redirecting to login page...");
        $window.location.href = '#!/login';
        return;
    }

    $scope.username = '';
    $scope.newUsername = '';
    $scope.newPassword = '';

    // Ambil data pengguna dari server
    $http.get('http://localhost:3000/api/userRoutes/profile', {
        headers: { Authorization: `Bearer ${token}` },
    }).then(function (response) {
        $scope.username = response.data.username; // Tampilkan username dari server
    }).catch(function (error) {
        console.error("Failed to fetch profile data:", error);
        alert("Session expired or invalid token. Redirecting to login page...");
        localStorage.removeItem('token');
        $window.location.href = '#!/login';
    });

    // Update Username
    $scope.updateUsername = function () {
        $http.put('http://localhost:3000/api/userRoutes/profile/username', 
        { username: $scope.newUsername }, 
        {
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
            alert("Username updated successfully!");
            $scope.username = response.data.username; // Perbarui username di UI
            $scope.newUsername = ''; // Reset form input
        }).catch(function (error) {
            console.error("Failed to update username:", error);
            alert("Failed to update username.");
        });
    };

    // Update Password
    $scope.updatePassword = function () {
        $http.put('http://localhost:3000/api/userRoutes/profile/password', 
        { password: $scope.newPassword }, 
        {
            headers: { Authorization: `Bearer ${token}` },
        }).then(function (response) {
            alert("Password updated successfully!");
            $scope.newPassword = ''; // Reset form input
        }).catch(function (error) {
            console.error("Failed to update password:", error);
            alert("Failed to update password.");
        });
    };

    // Delete Account
    $scope.deleteAccount = function () {
        if (confirm("Are you sure you want to delete your account?")) {
            $http.delete('http://localhost:3000/api/userRoutes/profile', {
                headers: { Authorization: `Bearer ${token}` },
            }).then(function () {
                alert("Account deleted successfully!");
                localStorage.removeItem('token'); // Hapus token dari localStorage
                $window.location.href = '#!/register'; // Redirect ke halaman registrasi
            }).catch(function (error) {
                console.error("Failed to delete account:", error);
                alert("Failed to delete account.");
            });
        }
    };

    // Logout
    $scope.logout = function () {
        localStorage.removeItem('token'); // Hapus token dari localStorage
        alert("Logged out successfully!");
        $window.location.href = '#!/login'; // Redirect ke halaman login
    };
});
