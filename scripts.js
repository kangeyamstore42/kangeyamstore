// Sample product data this is important don't change code just add images only (importent*****)
// Sample product data
const baseDescription = "Our Herbal Hair Oil is a powerful blend of 15 traditional herbs and natural oils, prepared using an age-old method to preserve their full medicinal value. Enriched with the goodness of <strong>Curry leaves, Henna, Savarikodi, Acalypha, Drumstick leaves, Hibiscus, Phyllanthus, Black cumin, Fenugreek, Amla, Tulsi, Black seeds, Ajwain leaves, and Shallots</strong>, this oil provides complete nourishment for your hair and scalp.";
const normalhairoil = "Our <strong>sulphur-free</strong> coconut oil is carefully extracted to retain its natural nutrients, making it perfect for hair, skin, and cooking. It nourishes and strengthens hair, promotes a healthy scalp, and keeps your skin soft and hydrated without any irritation. Completely natural and chemical-free, this coconut oil is safe for daily use and ideal for anyone looking for a wholesome, eco-friendly product. Experience the pure goodness of nature with every drop."

const products = [
  { 
    id: 1, 
    code: "0001", 
    name: "Herbal Hair Oil 100ml", 
    img: "images/oil.jpeg", 
    price: 150, 
    description: baseDescription,
    delivery : "Free Shipping",
   /* images: [
      "images/ecofriendly-beauty-product.jpg", 
      "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg", 
    ]*/
  },
  { 
    id: 2, 
    code: "0002", 
    name: "Herbal Hair Oil 200ml - - Combo Pack", 
    img: "images/oil.jpeg", 
    price: 270, 
    description: baseDescription,
    delivery : "Free Shipping",
  },
  { 
    id: 3, 
    code: "0003", 
    name: "Hair Oil 200ml - - (sulphur free oil)", 
    img: "images/oil.jpeg", 
    price: 150, 
    description: normalhairoil,
    delivery : "Free Shipping",
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

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500); // disappear after 2.5 sec
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
  showToast(`${product.name} added to cart!`);
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
