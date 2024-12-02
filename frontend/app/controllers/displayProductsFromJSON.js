window.displayProductsFromJSON = function(products) {
    const shopContainer = document.querySelector('.shop-container');

    // Clear container before displaying new products
    shopContainer.innerHTML = '';

    // Check if the "no-products" element exists
    const noProducts = document.querySelector('.no-products');

    if (products.length === 0) {
        if (noProducts) {
            noProducts.style.display = 'block';
        } else {
            console.warn("No '.no-products' element found in the DOM.");
        }
    } else {
        if (noProducts) {
            noProducts.style.display = 'none';
        }

        // Loop through each product in JSON and display in HTML
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.dataset.category = product.category;
            productDiv.dataset.price = product.price;

            productDiv.innerHTML = `
                <img src="${product.imageURL}" alt="${product.productName}">
                <h3>${product.productName}</h3>
                <span class="price">$${product.price}</span>
            `;

            // Add product element to the container
            shopContainer.appendChild(productDiv);
        });
    }
};
