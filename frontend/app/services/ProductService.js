// ProductService.js
angular.module('reShoesApp')
    .service('ProductService', function ($http) {
        // Ambil semua produk dari API
        this.getProducts = function () {
            return $http.get('http://localhost:3000/api/products');
        };

        // Tambahkan produk baru
        this.addProduct = function (newProduct) {
            return $http.post('http://localhost:3000/api/products', newProduct);
        };

        // Update produk yang ada
        this.updateProduct = function (id, updatedProduct) {
            return $http.put(`http://localhost:3000/api/products/${id}`, updatedProduct);
        };

        // Hapus produk berdasarkan ID
        this.deleteProduct = function (id) {
            return $http.delete(`http://localhost:3000/api/products/${id}`);
        };
    });
