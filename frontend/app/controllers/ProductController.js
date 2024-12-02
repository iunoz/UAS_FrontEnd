// Modul AngularJS
var app = angular.module('reShoesApp');

app.controller('ProductController', function($scope, $http) {
    // Ambil data produk dari API
    $http.get('http://localhost:3000/api/products') // Ganti dengan URL API Anda
        .then(function(response) {
            // Mengirim data produk ke fungsi displayProductsFromJSON setelah mendapatkan data dari API
            displayProductsFromJSON(response.data);
            // Menyimpan produk di scope Angular untuk digunakan di ng-repeat (jika diperlukan)
            $scope.products = response.data;
        })
        .catch(function(error) {
            console.error("Error loading products:", error);
        });
});
 