console.log('App loaded');
angular.module('reShoesApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './index.html',
                controller: 'IndexController'
            })
            .when('/about', {
                templateUrl: './views/about.html',
                controller: 'AboutController'
            })
            .when('/shop', {
                templateUrl: './views/shop.html',
                controller: 'ShopController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
