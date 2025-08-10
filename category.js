// Sample product data organized by category just add image only don't change code (importent********)
const products = {
  peanutcandy: [
    { id: 4, code: "0004", name: "Peanut Candy", price: 150, img: "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg" },
    { id: 5, code: "0005", name: "Peanut Candy Deluxe", price: 180, img: "images/vecteezy_close-up-of-a-stack-of-delicious-peanut-brittle-candy-bars_66482499.jpg" }
  ],
  clothes: [
    { id: 6, code: "0006", name: "T-Shirt", price: 20, img: "images/tshirt.jpg" },
    { id: 7, code: "0007", name: "Jeans", price: 40, img: "images/jeans.jpg" }
  ]
};







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reference to container where product cards will be rendered
const productsContainer = document.getElementById("products");

// Load products of a given category and render product cards
function loadProducts(category) {
  productsContainer.innerHTML = "";

  if (!category || !products[category]) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  products[category].forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.style.cursor = "pointer";

    // Clicking the card opens the product detail page
    card.addEventListener("click", () => openProductDetail(product.id));

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button type="button">Add to Cart</button>
    `;

    // Add to Cart button click handler
    const btn = card.querySelector("button");
    btn.addEventListener("click", (event) => {
      event.stopPropagation();  // Prevent triggering card click event
      addToCart(product);
    });

    productsContainer.appendChild(card);
  });
}

// Adds a product object to cart stored in localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

// Navigate to product details page using product id
function openProductDetail(id) {
  window.location.href = `productshow.html?id=${id}`;
}

// Navigation helpers
function goHome() {
  window.location.href = "index.html";
}

function goContact() {
  window.location.href = "contact.html";
}

function goCart() {
  window.location.href = "cart.html";
}

// Example call: load peanut candy category on page load
loadProducts("peanutcandy");


const images = document.querySelectorAll('.image-section img.slider-image');
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 5000); // every 5 seconds
