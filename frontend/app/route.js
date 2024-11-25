angular.module('reShoesApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/frontend/app/views/home.html',  // Perbarui path sesuai lokasi yang benar
                controller: 'HomeController'
            })
            .when('/about', {
                templateUrl: '/frontend/app/views/about.html',
                controller: 'AboutController'
            })
            .when('/shop', {
                templateUrl: '/frontend/app/views/shop.html',
                controller: 'ShopController'
            })
            .when('/home', {
                templateUrl: '/frontend/app/views/home.html',  // Perbarui path sesuai lokasi yang benar
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

