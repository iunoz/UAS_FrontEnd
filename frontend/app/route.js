angular.module('reShoesApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/frontend/app/views/home.html',
                controller: 'HomeController'
            })
            .when('/about', {
                templateUrl: '/frontend/app/views/about.html',
                controller: 'AboutController'
            })
            .when('/shop', {
                templateUrl: '/frontend/app/views/shop.html',
                controller: '/frontend/app/controllers/displayProduct.js'
            })
            .when('/home', {
                templateUrl: '/frontend/app/views/home.html',
                controller: 'HomeController'
            })
            .when('/contact', {
                templateUrl: '/frontend/app/views/contact.html',
                controller: 'ContactController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

