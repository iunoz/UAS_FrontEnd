angular.module('reShoesApp').component('navbar', {
    templateUrl: '/frontend/components/navbar.html',
    controller: function($scope, $window, $http) {
        // Periksa apakah pengguna sudah login
        $scope.isLoggedIn = false; // Default belum login

        // Validasi token di localStorage
        $scope.validateToken = function() {
            const token = localStorage.getItem('token');
            if (token) {
                $http.post('http://localhost:3000/api/userRoutes/auth/check', {}, {
                    headers: { Authorization: token },
                }).then(() => {
                    $scope.isLoggedIn = true; // Token valid
                }).catch(() => {
                    $scope.isLoggedIn = false; // Token invalid
                    localStorage.removeItem('token'); // Hapus token invalid
                });
            }
        };

        // Tombol login button logic
        $scope.getLoginButtonLink = function() {
            return $scope.isLoggedIn ? '#!/profile' : '#!/login';
        };

        // Logout: Hapus token dan redirect ke login
        $scope.logout = function() {
            localStorage.removeItem('token');
            $scope.isLoggedIn = false;
            $window.location.href = '#!/login';
        };

        // Panggil validasi token saat navbar dimuat
        $scope.validateToken();

        // Toggle menu untuk mobile view
        $scope.isMenuOpen = false;
        $scope.toggleMenu = function() {
            $scope.isMenuOpen = !$scope.isMenuOpen;
        };
    },
});
