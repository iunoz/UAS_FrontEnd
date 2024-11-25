angular.module('reShoesApp').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/frontend/index.html',
            controller: 'IndexController'
        })
        .when('/about', {
            templateUrl: './views/about.html',
            controller: 'AboutController'
        })  
        .when('/shop', {
            templateUrl: './views/shop.html',
            controller: 'AboutController'
        })
        .otherwise({
            redirectTo: '/'
        });
});