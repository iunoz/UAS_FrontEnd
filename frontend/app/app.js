// app.js
// Definisikan modul utama aplikasi
var app = angular.module('reShoesApp', ['ngRoute']); // 'ngRoute' untuk routing

// Konfigurasi global (opsional)
app.constant('API_URL', 'https://api.reshoes.com');

angular.module('reShoesApp')
    .controller('HomeController', function($scope) {
        // Data yang ingin Anda tampilkan di home.html
        $scope.message = "Welcome to the ReShoes Home Page!";
        
        $scope.product = {
            name: "ReShoes Air Max 200 GO",
            price: "$122.15",
            description: "Comfort and eco-friendly shoes for a better future.",
            rating: 5
        };
        
        // Tambahkan data lainnya sesuai kebutuhan
    });

