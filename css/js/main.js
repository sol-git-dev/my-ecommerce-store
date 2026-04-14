// Products Database
const products = [
    { id: 1, name: "Wireless Headphones", price: 89.99, category: "electronics" },
    { id: 2, name: "Smart Watch", price: 199.99, category: "electronics" },
    { id: 3, name: "Organic T-Shirt", price: 29.99, category: "clothing" },
    { id: 4, name: "Yoga Mat", price: 49.99, category: "sports" },
    { id: 5, name: "Coffee Maker", price: 79.99, category: "home" },
    { id: 6, name: "Running Shoes", price: 129.99, category: "sports" },
];

// Shopping Cart
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveCart();
        alert('Product added to cart!');
    }

    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        const countEl = document.getElementById('cartCount');
        if (countEl) {
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }
    }
}

const cart = new ShoppingCart();

// Display Products
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <i class="fas fa-shopping-bag"></i>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
    }
}

// Mobile Menu
const mobileToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    cart.updateCartCount();
});
