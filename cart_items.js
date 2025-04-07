function formatPrice(price) {
    return `${Number(price).toFixed(2)}`;
}

// Function to add items to cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // alert("Item added to cart!");
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateQuantity(name, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to load cart items in cart.html
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    cartContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${formatPrice(item.price)} x ${item.quantity}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = formatPrice(totalPrice);
}

// Function to clear cart
function checkout() {
    alert("Thank you for shopping with us!");
    // localStorage.removeItem("cart");
    loadCart();
}

// Load cart items when cart.html loads
if (document.getElementById("cart-items")) {
    loadCart();
}
