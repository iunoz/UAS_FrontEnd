// Fungsi untuk menampilkan produk dalam bentuk JSON
function displayProductsFromJSON(products) {
    const shopContainer = document.querySelector('.shop-container');
    
    // Kosongkan container sebelum menampilkan produk baru
    shopContainer.innerHTML = '';

    // Cek jika tidak ada produk dalam JSON
    if (products.length === 0) {
        const noProducts = document.querySelector('.no-products');
        noProducts.style.display = 'block';
    } else {
        // Sembunyikan pesan "No products found"
        const noProducts = document.querySelector('.no-products');
        noProducts.style.display = 'none';
        
        // Loop untuk setiap produk dalam JSON dan tampilkan di HTML
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.dataset.category = product.category;
            productDiv.dataset.price = product.price;

            productDiv.innerHTML = `
                <a href="${product.productUrl}">
                    <img src="${product.imageUrl}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <span class="price">$${product.price}</span>
                </a>
            `;

            // Menambahkan elemen produk ke dalam container
            shopContainer.appendChild(productDiv);
        });
    }
}
 