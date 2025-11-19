// ===== STRIPE CONFIGURATION =====
// IMPORTANT: Replace this with your actual Stripe Publishable Key
// Get it from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_YOUR_KEY_HERE'; // Replace with your key

// Initialize Stripe
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// Product Configuration
const PRODUCT = {
    name: 'Premium Henna Cone',
    price: 12.00, // Price in dollars
    currency: 'usd',
    image: 'https://your-website.com/shop-content/henna-cone-main.jpg' // Update with your actual image URL
};

// ===== QUANTITY MANAGEMENT =====
let quantity = 1;
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const totalPriceSpan = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkoutButton');

// Update total price
function updateTotalPrice() {
    const total = (PRODUCT.price * quantity).toFixed(2);
    totalPriceSpan.textContent = total;
}

// Decrease quantity
decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateTotalPrice();
    }
});

// Increase quantity
increaseBtn.addEventListener('click', () => {
    if (quantity < 20) {
        quantity++;
        quantityInput.value = quantity;
        updateTotalPrice();
    }
});

// Handle manual input
quantityInput.addEventListener('change', (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
        value = 1;
    } else if (value > 20) {
        value = 20;
    }
    quantity = value;
    quantityInput.value = quantity;
    updateTotalPrice();
});

// ===== IMAGE GALLERY =====
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainProductImage');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        
        // Update main image
        const newImage = thumb.getAttribute('data-image');
        mainImage.src = newImage;
    });
});

// ===== STRIPE CHECKOUT =====
checkoutButton.addEventListener('click', async () => {
    // Check if Stripe key is configured
    if (STRIPE_PUBLISHABLE_KEY === 'pk_test_YOUR_KEY_HERE') {
        alert('⚠️ Stripe is not configured yet!\n\nPlease follow the setup instructions in shop-checkout.js to connect your Stripe account.');
        return;
    }
    
    // Disable button to prevent double clicks
    checkoutButton.disabled = true;
    checkoutButton.innerHTML = '<span>Processing...</span>';
    
    try {
        // Create Checkout Session
        // Note: This requires a backend endpoint. See instructions below.
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productName: PRODUCT.name,
                price: PRODUCT.price,
                quantity: quantity,
                currency: PRODUCT.currency
            }),
        });
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        
        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your payment. Please try again.');
    } finally {
        // Re-enable button
        checkoutButton.disabled = false;
        checkoutButton.innerHTML = '<span>Buy Now with Stripe</span>';
    }
});

// ===== ALTERNATIVE: STRIPE PAYMENT LINKS (EASIER SETUP) =====
// If you don't want to set up a backend, you can use Stripe Payment Links instead.
// Uncomment this code and comment out the checkout code above:

/*
checkoutButton.addEventListener('click', () => {
    // Create a Payment Link in your Stripe Dashboard and paste it here
    const PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK';
    
    // Add quantity to the URL if Stripe supports it for your link
    window.location.href = PAYMENT_LINK + '?quantity=' + quantity;
});
*/

