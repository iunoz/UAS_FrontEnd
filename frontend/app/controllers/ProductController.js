angular.module('reShoesApp')
    .controller('ProductController', function ($scope, ProductService) {
        // Inisialisasi variabel
        $scope.products = []; // Semua produk
        $scope.filteredProducts = []; // Produk yang difilter berdasarkan pencarian dan filter
        $scope.displayedProducts = []; // Produk yang ditampilkan di halaman saat ini
        $scope.pageSize = 8; // Menampilkan 8 produk per halaman
        $scope.currentPage = 1; // Halaman saat ini
        $scope.searchQuery = ''; // Query pencarian produk
        $scope.selectedCategory = ''; // Kategori yang dipilih
        $scope.priceRange = { min: 0, max: 1000 }; // Filter harga (range harga)
        $scope.categories = ['essentials', 'premium', 'luxury']; // Daftar kategori produk

        // Ambil data produk dari service
        ProductService.getProducts()
            .then(function (response) {
                $scope.products = response.data;
                $scope.filteredProducts = $scope.products; // Atur produk yang difilter untuk ditampilkan
                $scope.updateDisplayedProducts(); // Memastikan produk yang ditampilkan sesuai dengan halaman pertama
                displayProductsFromJSON($scope.filteredProducts); // Panggil untuk menampilkan produk setelah data dimuat
            })
            .catch(function (error) {
                console.error("Error loading products:", error);
            });

        // Fungsi untuk mengupdate produk yang ditampilkan berdasarkan halaman dan filter
        $scope.updateDisplayedProducts = function () {
            const start = ($scope.currentPage - 1) * $scope.pageSize;
            const end = start + $scope.pageSize;
            $scope.displayedProducts = $scope.filteredProducts.slice(start, end);
            displayProductsFromJSON($scope.displayedProducts); // Pastikan yang ditampilkan sesuai dengan halaman
        };

        // Fungsi untuk mencari produk berdasarkan nama
        $scope.searchProducts = function () {
            // Filter produk berdasarkan pencarian
            $scope.filteredProducts = $scope.products.filter(function (product) {
                return product.productName.toLowerCase().includes($scope.searchQuery.toLowerCase());
            });
            $scope.currentPage = 1; // Reset ke halaman pertama setelah pencarian
            $scope.updateDisplayedProducts(); // Update produk yang ditampilkan setelah pencarian
        };

        // Fungsi untuk memfilter produk berdasarkan kategori dan harga
        $scope.filterProducts = function () {
            // Filter produk berdasarkan kategori dan harga
            $scope.filteredProducts = $scope.products.filter(function (product) {
                const matchesCategory = !$scope.selectedCategory || product.category === $scope.selectedCategory;
                const matchesPrice = product.price >= $scope.priceRange.min && product.price <= $scope.priceRange.max;
                return matchesCategory && matchesPrice;
            });
            $scope.currentPage = 1; // Reset ke halaman pertama setelah filter
            $scope.updateDisplayedProducts(); // Update produk yang ditampilkan setelah filter
        };

        // Fungsi untuk mengatur halaman
        $scope.setPage = function (page) {
            $scope.currentPage = page;
            $scope.updateDisplayedProducts(); // Update produk yang ditampilkan berdasarkan halaman
        };

        // Fungsi untuk mendapatkan total jumlah halaman
        $scope.getTotalPages = function () {
            return Math.ceil($scope.filteredProducts.length / $scope.pageSize);
        };
    });
