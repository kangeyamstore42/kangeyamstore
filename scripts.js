// Sample product data this is important don't change code just add images only (importent*****)
const products = [
  { id: 1, code: "0001", name: "Hair Oil 250ml", img: "images/ecofriendly-beauty-product.jpg", price: 130 },
  { id: 2, code: "0002", name: "Hair Oil 500ml", img: "images/hair-serum-bottle-with-brown-hair.jpg", price: 180 },
  { id: 3, code: "0003", name: "hair Oil 100ml", img: "images/front-view-oil-made-from-green-plant.jpg", price: 80 },
  
];


/////////////////////////////////////////////////////////////////////////////////////////

const productsContainer = document.getElementById("products");

// Load products dynamically
function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}"/><br><br>
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



function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Set inner HTML without onclick handlers on individual elements
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div>${product.name}</div>
      <div>₹${product.price}</div>
      <button>Add to Cart</button>
    `;

    // Make the whole card clickable to open product detail
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openProductDetail(product.id));

    // Prevent the button click from triggering card click (so it only adds to cart)
    const btn = card.querySelector("button");
    btn.onclick = (event) => {
      event.stopPropagation(); // Stop bubbling so card click doesn't happen
      addToCart(product.id);
    };

    productsContainer.appendChild(card);
  });
}

function openProductDetail(id) {
  window.location.href = `productshow.html?id=${id}`;
}



//image transition 

const images = document.querySelectorAll('.image-section img.slider-image');
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}, 5000); // every 5 seconds
