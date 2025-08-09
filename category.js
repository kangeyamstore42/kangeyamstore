// Sample product data
const products = {
  electronics: [
    { id: 4, code: "0004", name: "Phone", price: 500, image: "phone.jpg" },
    { id: 5, code: "0005", name: "Laptop", price: 1200, image: "laptop.jpg" }
  ],
  clothes: [
    { id: 6, code: "0006", name: "T-Shirt", price: 20, image: "tshirt.jpg" },
    { id: 7, code: "0007", name: "Jeans", price: 40, image: "jeans.jpg" }
  ]
};

function loadProducts(category) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (!category || !products[category]) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products[category].forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify({...product, category})})'>Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists in cart
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1; // increase quantity
  } else {
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

function goHome() {
  window.location.href = "index.html";
}

function goContact() {
  window.location.href = "contact.html";
}

function goCart() {
  window.location.href = "cart.html";
}
