angular.module('reShoesApp').component('navbar', {
    templateUrl: '/frontend/components/navbar.html', // Pastikan path ini benar
    controller: function($scope) {
        $scope.isMenuOpen = false; // Awalnya menu tertutup

        $scope.toggleMenu = function() {
            $scope.isMenuOpen = !$scope.isMenuOpen; // Toggle menu saat hamburger di klik
        };

        console.log('Navbar component loaded');
    }
});
