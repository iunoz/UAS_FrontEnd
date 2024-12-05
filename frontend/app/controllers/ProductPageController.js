// Definisikan controller untuk halaman produk
app.controller('ProductPageController', function($scope, $routeParams) {
    // Ambil ID produk dari URL menggunakan $routeParams
    const productId = $routeParams.id; 
    console.log('ProductPageController loaded with ID:', productId);

    // Pastikan ID produk valid
    if (!productId) {
        $scope.error = "ID produk tidak ditemukan di URL.";
        console.error($scope.error);
        return;
    }

    // Fetch data produk berdasarkan ID
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => {
            // Jika response gagal, lemparkan error
            if (!response.ok) {
                throw new Error("Gagal mendapatkan data produk.");
            }
            return response.json(); // Parse JSON dari response
        })
        .then(product => {
            // Set data produk ke dalam scope AngularJS
            $scope.product = product;
            $scope.$apply(); // Force AngularJS untuk update UI
            console.log("Produk ditemukan:", product);
        })
        .catch(error => {
            // Tangani error dengan menampilkan pesan ke user
            console.error("Error fetching product:", error);
            $scope.error = "Produk tidak ditemukan.";
            $scope.$apply(); // Force AngularJS untuk update UI
        });
});
