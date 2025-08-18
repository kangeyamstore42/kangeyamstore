// Sample product data this is important don't change code just add images only (importent*****)
// Sample product data
const products = [
  { 
    id: 1, 
    code: "0001", 
    name: "Hair Oil 250ml", 
    img: "images/ecofriendly-beauty-product.jpg", 
    price: 130, 
    description: "Hair oil",
    images: [
      "images/ecofriendly-beauty-product.jpg", 
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg", 
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg",
    ]
  },
  { 
    id: 2, 
    code: "0002", 
    name: "Hair Oil 500ml", 
    img: "images/hair-serum-bottle-with-brown-hair.jpg", 
    price: 180, 
    description: "Hair oil",
    images: [
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg", 
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg", 
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg"
    ]
  },
  { 
    id: 3, 
    code: "0003", 
    name: "Hair Oil 100ml", 
    img: "images/front-view-oil-made-from-green-plant.jpg", 
    price: 80, 
    description: "Hair oil",
    images: [
      "images/front-view-oil-made-from-green-plant.jpg", 
      "images/hair-100ml-side.jpg", 
      "images/hair-100ml-back.jpg"
    ]
  }
];

























const productsContainer = document.getElementById("products");

// Load products dynamically
function loadProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Set inner HTML
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div>${product.name}</div>
      <div>₹${product.price}</div>
      <button>Add to Cart</button>
    `;

    // Make entire card clickable to open product detail
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openProductDetail(product.id));

    // Prevent button click from triggering card click
    const btn = card.querySelector("button");
    btn.onclick = (event) => {
      event.stopPropagation(); // stop card click
      addToCart(product.id);
    };

    productsContainer.appendChild(card);
  });
}

// Open product detail page
function openProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  // Save product to localStorage for productshow page
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "productshow.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.length; // number of products
  document.getElementById("cart-count").textContent = totalCount;
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
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
  updateCartCount();
}

// Navigation handlers
function goHome() { window.location.href = "index.html"; }
function goContact() { alert("Contact page coming soon!"); }
function goCart() { window.location.href = "cart.html"; }
function gotorderdetails() { window.location.href = "getorderdetails/getorderdetails.html"; }

// Image slider (if any on index page)
const images = document.querySelectorAll('.image-section img.slider-image');
let currentIndex = 0;
setInterval(() => {
  if (images.length === 0) return;
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 5000); // every 5 seconds

// Load all products
loadProducts();
