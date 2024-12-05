angular.module('reShoesApp')
    .controller('AdminController', function ($scope, $http) {  // Ensure $http is injected here
        $scope.products = []; // Array for storing product data

        // Function to fetch products from the API
        $scope.fetchProducts = function () {
            $http.get('http://localhost:3000/api/products')
                .then(function (response) {
                    $scope.products = response.data; // Store the fetched products in scope
                })
                .catch(function (error) {
                    console.error('Error fetching products:', error);
                });
        };

        // Add a new product
        $scope.addProduct = function () {
            const newProduct = {
                productName: $scope.newProduct.productName,
                price: $scope.newProduct.price,
                category: $scope.newProduct.category,
                imageURL: $scope.newProduct.imageURL, // Ensure correct path for the image URL
            };

            $http.post('http://localhost:3000/api/products', newProduct)
                .then(function (response) {
                    $scope.products.push(response.data); // Add the new product to the list
                    $scope.newProduct = { productName: '', price: '', category: '', imageURL: '' }; // Reset form
                    console.log('Product added successfully:', response.data);
                })
                .catch(function (error) {
                    console.error('Error adding product:', error);
                });
        };

        // Edit an existing product
        $scope.editProduct = function (product) {
            $scope.editingProduct = angular.copy(product); // Create a copy of the product to edit
        };

        $scope.updateProduct = function () {
            $http.put(`http://localhost:3000/api/products/${$scope.editingProduct._id}`, $scope.editingProduct)
                .then(function (response) {
                    const index = $scope.products.findIndex(p => p._id === response.data._id);
                    if (index !== -1) {
                        $scope.products[index] = response.data; // Update product in the list
                    }
                    $scope.editingProduct = null; // Reset editing form
                })
                .catch(function (error) {
                    console.error('Error updating product:', error);
                });
        };

        // Delete a product
        $scope.deleteProduct = function (id, index) {
            $http.delete(`http://localhost:3000/api/products/${id}`)
                .then(function () {
                    $scope.products.splice(index, 1); // Remove product from the list
                })
                .catch(function (error) {
                    console.error('Error deleting product:', error);
                });
        };

        // Initialize: Fetch data when the page loads
        $scope.fetchProducts();
    });
