// Sample product data organized by category just add image only don't change code (importent********)
const products = {
  peanutcandy: [
    { id: 101, 
      code: "1001", 
      name: "Peanut Candy (40pcs)", 
      price: 200, 
      img: "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg",
      description: "Our Peanut Candy is a perfect blend of crunchy roasted peanuts and pure jaggery, made using traditional methods for an authentic taste. This healthy snack is rich in protein, iron, and natural energy, making it an ideal choice for kids, adults, and fitness lovers.",
      delivery: "Free Shipping" },
    { id: 102, 
      code: "1002", 
      name: "Peanut Candy Deluxe (40pcs)", 
      price: 200, 
      img: "images/vecteezy_close-up-of-a-stack-of-delicious-peanut-brittle-candy-bars_66482499.jpg", 
      description: "Our Peanut Candy is a perfect blend of crunchy roasted peanuts and pure jaggery, made using traditional methods for an authentic taste. This healthy snack is rich in protein, iron, and natural energy, making it an ideal choice for kids, adults, and fitness lovers.",
      delivery: "Free Shipping" }
  ]
};







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reference to container where product cards will be rendered
const productsContainer = document.getElementById("products");

// Flatten all products into a single array for easier ID lookup
const allProducts = Object.values(products).flat();

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

// Navigate to productshow page and save product to localStorage
function openProductDetail(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

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
  showToast(`${product.name} added to cart!`);
  updateCartCount();
}

// Navigation helpers
function goHome() { window.location.href = "index.html"; }
function goContact() { window.location.href = "contact.html"; }
function goCart() { window.location.href = "cart.html"; }

// Load peanut candy category on page load
loadProducts("peanutcandy");

// Image slider (optional)
const images = document.querySelectorAll('.image-section img.slider-image');
let currentIndex = 0;

setInterval(() => {
  if(images.length === 0) return;
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 5000);
