let cart = [];
let total = 0;

// DOM Manipulation for Cart
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    updateCartUI();
    alert(`${productName} added to cart!`);
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span> <span>$${item.price.toLocaleString()}</span>`;
        cartItems.appendChild(li);
    });
    document.getElementById('totalPrice').innerText = total.toLocaleString();
}

// Modal Visibility Controls
const cartModal = document.getElementById('cartModal');
const paymentModal = document.getElementById('paymentModal');

document.getElementById('cartBtn').onclick = (e) => {
    e.preventDefault();
    cartModal.style.display = "block";
}

function closeCart() { cartModal.style.display = "none"; }
function closePayment() { paymentModal.style.display = "none"; }

function openPayment() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    closeCart();
    paymentModal.style.display = "block";
}

// Form Submission
function processPayment(event) {
    event.preventDefault();
    alert("Payment successful! Thank you for choosing Vehicle Paradise.");
    
    cart = [];
    total = 0;
    updateCartUI();
    closePayment();
}