// Sample product data
const products = [
  { id: 1, code: "0001", name: "Product A", img: "https://via.placeholder.com/20", price: 10 },
  { id: 2, code: "0002", name: "Product B", img: "https://via.placeholder.com/20", price: 20 },
  { id: 3, code: "0003", name: "Product C", img: "https://via.placeholder.com/20", price: 15 },
];

const productsContainer = document.getElementById("products");

// Load products dynamically
function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div>${product.name}</div>
      <div>₹${product.price}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

// Add to cart in localStorage
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.qty++;
  } else {
    cart.push({...product, qty: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Navigation handlers
function goHome() {
  window.location.href = "index.html";
}
function goContact() {
  alert("Contact page coming soon!");
}
function goCart() {
  window.location.href = "cart.html";
}

loadProducts();
