// Daftar produk
const products = [
    { id: 1, name: "Arduino uno", price: 50000 },
    { id: 2, name: "Esp32", price: 75000 },
    { id: 3, name: "Raspberry Pi", price: 100000 }
];

// Keranjang yang disimpan di localStorage agar bisa diakses dari setiap halaman
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi untuk menampilkan daftar produk di halaman Produk
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Kosongkan daftar produk sebelum diisi

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name}</span>
            <span>Rp${product.price}</span>
            <button onclick="addToCart(${product.id})">Tambahkan ke Keranjang</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} ditambahkan ke keranjang.`);
}

// Fungsi untuk menampilkan isi keranjang
function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Keranjang kosong</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <span>${item.product.name} - Rp${item.product.price} x ${item.quantity}</span>
                <div>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="removeFromCart(${index})">Hapus</button>
                </div>
            `;
            cartDiv.appendChild(cartItemDiv);
        });
    }
    calculateTotal();
}

// Fungsi untuk menambah jumlah produk
function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Fungsi untuk mengurangi jumlah produk
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // Hapus item jika jumlahnya 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Fungsi untuk menghitung total harga
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.innerText = `Rp${total}`;
    }
}

// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Fungsi untuk menampilkan daftar item di halaman checkout
function checkout() {
    const checkoutSummary = document.getElementById("checkout-summary");
    checkoutSummary.innerHTML = ""; // Kosongkan konten sebelumnya

    if (cart.length === 0) {
        checkoutSummary.innerHTML = "<p>Keranjang kosong. Silakan tambahkan produk ke keranjang.</p>";
    } else {
        cart.forEach((item) => {
            const checkoutItemDiv = document.createElement("div");
            checkoutItemDiv.classList.add("checkout-item");
            checkoutItemDiv.innerHTML = `
                <span>${item.product.name} - Rp${item.product.price} x ${item.quantity}</span>
                <span>Rp${item.product.price * item.quantity}</span>
            `;
            checkoutSummary.appendChild(checkoutItemDiv);
        });
    }
    calculateTotal(); // Panggil fungsi untuk menghitung total harga
}

// Fungsi untuk menyelesaikan checkout
function finalizeCheckout() {
    if (cart.length === 0) {
        alert("Keranjang kosong. Tidak ada yang bisa dibayar.");
    } else {
        alert("Pembayaran berhasil! Terima kasih telah berbelanja.");
        cart = []; // Kosongkan keranjang setelah checkout
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "index.html"; // Kembali ke halaman produk
    }
}

// Fungsi navigasi ke halaman Checkout
function goToCheckout() {
    window.location.href = "checkout.html";
}

// Fungsi navigasi ke halaman Keranjang
function goToCart() {
    window.location.href = "cart.html";
}

// Fungsi navigasi ke halaman Produk
function goToProductPage() {
    window.location.href = "index.html";
}
