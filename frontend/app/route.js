var app = angular.module('reShoesApp', ['ngRoute']); // Main module with 'ngRoute' dependency

// Configure routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/frontend/app/views/home.html',
        })
        .when('/shop', {
            templateUrl: '/frontend/app/views/shop.html', // Path to your shop page
            controller: 'ProductController' // Reference to the shop's controller
        })
        .when('/product/:id', {
            templateUrl: '/frontend/app/views/product.html', // Path to your product page
            controller: 'ProductPageController' // Reference to the product page's controller
        })
        .when('/about', {
            templateUrl: '/frontend/app/views/about.html', // Path to your about page
            controller: 'AboutController' // Reference to the about page's controller
        })
        .when('/contact', {
            templateUrl: '/frontend/app/views/contact.html', // Path to your contact page
            controller: 'ContactController' // Reference to the contact page's controller
        })
        .when('/login', {
            templateUrl: '/frontend/app/views/login.html', // Path to your login page
            controller: 'LoginController' // Reference to the login page's controller
        })
        .when('/register', {
            templateUrl: '/frontend/app/views/register.html', // Path to your register page
            controller: 'RegisterController' // Reference to the register page's controller
        })
        .when('/home', {
            templateUrl: '/frontend/app/views/home.html', // Path to your home page
            controller: 'HomeController' // If you want to use a controller for home page
        })
        .when('/admin', {
            templateUrl: '/frontend/app/views/admin.html', // Path to your home page
            controller: 'AdminController' // If you want to use a controller for home page
        })
        .when('/profile', {
            templateUrl: '/frontend/app/views/profile.html', // Path to your home page
            controller: 'ProfileController' // If you want to use a controller for home page
        })
        .otherwise({
            redirectTo: '/home' // Default route to home (no need to provide full path)
        });
});
