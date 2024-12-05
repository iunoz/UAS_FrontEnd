// ProductController.js
angular.module('reShoesApp')
    .controller('ProductController', function ($scope, ProductService) {
        // Ambil data produk dari service
        ProductService.getProducts()
            .then(function (response) {
                $scope.products = response.data; // Simpan data produk di scope untuk digunakan di ng-repeat
                displayProductsFromJSON(response.data);
            })
            .catch(function (error) {
                console.error("Error loading products:", error);
            });
    });
