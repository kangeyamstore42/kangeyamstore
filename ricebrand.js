// Sample product data (don't change code, only images)
const products = [
  { id: 201, code: "2001", name: "Akshaya ponni - 26kg", img: "images/rice image1.jpg", price: 1800, description: "Akshaya Ponni Rice is a premium-quality rice variety cultivated in the fertile lands of Manachanallur, Tamil Nadu – a region known for producing the finest rice in South India. Carefully harvested and processed to retain its natural aroma, taste, and nutritional value, this rice is soft, fluffy, and perfect for everyday meals.",delivery : "Free Shipping", },
  { id: 202, code: "2002", name: "Akshaya ponni - 10kg", img: "images/rice image1.jpg", price: 800, description: "Akshaya Ponni Rice is a premium-quality rice variety cultivated in the fertile lands of Manachanallur, Tamil Nadu – a region known for producing the finest rice in South India. Carefully harvested and processed to retain its natural aroma, taste, and nutritional value, this rice is soft, fluffy, and perfect for everyday meals.",delivery : "Free Shipping", },
  { id: 203, code: "2003", name: "Akshaya ponni - 5kg", img: "images/rice image1.jpg", price: 400, description: "Akshaya Ponni Rice is a premium-quality rice variety cultivated in the fertile lands of Manachanallur, Tamil Nadu – a region known for producing the finest rice in South India. Carefully harvested and processed to retain its natural aroma, taste, and nutritional value, this rice is soft, fluffy, and perfect for everyday meals.",delivery : "Free Shipping", },
  { id: 204, code: "2004", name: "5, 6 - 20 Brand -  26kg", img: "images/rice image 2.jpg", price: 1350, description: "5, 6 - 20 Brand Rice is a premium-grade rice cultivated in the fertile fields of Manachanallur, Tamil Nadu. Known for its authentic taste, soft texture, and natural aroma, this rice is a trusted choice for South Indian households. Carefully cleaned and stone-free, it ensures the perfect balance of purity, nutrition, and quality in every meal.",delivery : "Free Shipping", },
  { id: 205, code: "2005", name: "5, 6 - 20 Brand -  10kg", img: "images/rice image 2.jpg", price: 550, description: "5, 6 - 20 Brand Rice is a premium-grade rice cultivated in the fertile fields of Manachanallur, Tamil Nadu. Known for its authentic taste, soft texture, and natural aroma, this rice is a trusted choice for South Indian households. Carefully cleaned and stone-free, it ensures the perfect balance of purity, nutrition, and quality in every meal.",delivery : "Free Shipping", },
  { id: 206, code: "2006", name: "5, 6 - 20 Brand -  5kg", img: "images/rice image 2.jpg", price: 275, description: "5, 6 - 20 Brand Rice is a premium-grade rice cultivated in the fertile fields of Manachanallur, Tamil Nadu. Known for its authentic taste, soft texture, and natural aroma, this rice is a trusted choice for South Indian households. Carefully cleaned and stone-free, it ensures the perfect balance of purity, nutrition, and quality in every meal.",delivery : "Free Shipping", },

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
      <div>${product.name}</div>
      <div>₹${product.price}</div>
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
