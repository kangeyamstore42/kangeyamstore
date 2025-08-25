// Sample product data (don't change code, only images)
const products = [
  { id: 301, code: "3001", name: "Chicken Pickle - 500 gm", img: "images/oil.jpeg", price: 250, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Free Shipping",
   },
  { id: 302, code: "3002", name: "Chicken Pickle - Combo - 500 gm", img: "images/oil.jpeg", price: 470, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Free Shipping",
   },
  { id: 303, code: "3003", name: "Amla Pickle - 100 gm", img: "images/oil.jpeg", price: 100, description: "Our Homemade Amla Pickle is a delicious blend of tender Amala marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Free Shipping",
   },
];

const productsContainer = document.getElementById("products");

// Load products dynamically
function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.cursor = "pointer";

    // Make the whole card clickable
    card.addEventListener("click", () => openProductDetail(product.id));

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div>${product.name}</div><br>
      <strong><div>₹${product.price}</div></strong>
      <button type="button">Add to Cart</button>
    `;

    // Prevent button click from triggering card click
    const btn = card.querySelector("button");
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(product.id);
    });

    productsContainer.appendChild(card);
  });
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

// Navigate to productshow page and save product to localStorage
function openProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "productshow.html";
}

// Navigation handlers
function goHome() { window.location.href = "index.html"; }
function goContact() { alert("Contact page coming soon!"); }
function goCart() { window.location.href = "cart.html"; }
function gotorderdetails() { window.location.href = "getorderdetails/getorderdetails.html"; }

loadProducts();

// Image slider (if used)
const images = document.querySelectorAll('.image-section img.slider-image');
let currentIndex = 0;
setInterval(() => {
  if(images.length === 0) return;
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 5000);
