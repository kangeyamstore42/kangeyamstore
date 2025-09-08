// Sample product data (don't change code, only images)
const products = [
  { id: 301, code: "3001", name: "Boneless Chicken Pickle - (200 g)", img: "images/chicken1.jpeg", price: 249, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Tamil Nadu 30 rupee",
   },
     { id: 302, code: "3002", name: "Boneless Chicken Pickle - (300 g)", img: "images/chicken1.jpeg", price: 349, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Tamil Nadu 30 rupee",
   },
     { id: 303, code: "3003", name: "Boneless Chicken Pickle - (400 g)", img: "images/chicken1.jpeg", price: 449, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Tamil Nadu 30 rupee",
   },
   { id: 304, code: "3004", name: "Boneless Chicken Pickle - (500 g)", img: "images/chicken1.jpeg", price: 549, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Tamil Nadu 30 rupee",
   },
  { id: 305, code: "3005", name: "Combo Pack -- 2 × 500 g Chicken Pickle", img: "images/chicken2.jpeg", price: 999, description: "Our Homemade Chicken Pickle is a delicious blend of tender chicken pieces marinated and slow-cooked with a traditional mix of spices. Made in small batches with love and care, this pickle carries the perfect balance of tangy, spicy, and aromatic flavors. Free from preservatives and packed with authentic taste, it is the ideal side dish to elevate every meal.",
    delivery : "Tamil Nadu 60 rupee",
   },
  { id: 306, code: "3006", name: "Amla Pickle - (100 g)", img: "images/amla1.jpeg", price: 60, description: "Our Homemade Amla Pickle is crafted with handpicked, tender amla slow-cooked in a traditional blend of aromatic spices. Prepared in small batches to preserve authenticity, it delivers a delightful balance of tanginess and spice in every bite. Free from artificial preservatives and packed with natural goodness, this pickle adds a burst of flavor to any meal, making it the perfect companion for your everyday dining.",
    delivery : "Tamil Nadu 30 rupee",
   },
   { id: 307, code: "3007", name: "Combo Pack -- 2 × 100 g Amla Pickle", img: "images/amla2.jpeg", price: 110, description: "Our Homemade Amla Pickle is crafted with handpicked, tender amla slow-cooked in a traditional blend of aromatic spices. Prepared in small batches to preserve authenticity, it delivers a delightful balance of tanginess and spice in every bite. Free from artificial preservatives and packed with natural goodness, this pickle adds a burst of flavor to any meal, making it the perfect companion for your everyday dining.",
    delivery : "Tamil Nadu 30 rupee",
   },
   { id: 308, code: "3008", name: "Combo Pack -- Chicken Pickle 200 g + Amla Pickle 100 g", img: "images/chickenamla1.jpeg", price: "299", description: "Enjoy the perfect blend of spicy and tangy flavors with our Chicken & Amla Pickle Combo. The 500 g Chicken Pickle delivers a rich, bold, and authentic taste, while the 100 g Amla Pickle is zesty, healthy, and naturally preserved. This combo is perfect for family meals or gifting. Get it at a special combo price and enjoy great savings compared to buying separately.",
    delivery : "Tamil Nadu 30 rupee",
   },
   { id: 309, code: "3009", name: "Dry Fish Pickle (Karuvaadu) - (200 g)", img: "images/karuvaadu1.jpeg", price: 200, description: "Our Traditional Karuvaadu Pickle (Dry Fish Pickle) is a flavorful blend of sun-dried fish slow-cooked with authentic spices. It delivers a bold, tangy, and spicy taste that pairs perfectly with hot rice or curd rice. Prepared in small batches with care, free from preservatives, and packed with rich coastal flavors.",
    delivery : "Tamil Nadu 30 rupee",
   },
{ id: 310, code: "3010", name: "Dry Fish Pickle (Karuvaadu) - (300 g)", img: "images/karuvaadu1.jpeg", price: 300, description: "Our Traditional Karuvaadu Pickle (Dry Fish Pickle) is a flavorful blend of sun-dried fish slow-cooked with authentic spices. It delivers a bold, tangy, and spicy taste that pairs perfectly with hot rice or curd rice. Prepared in small batches with care, free from preservatives, and packed with rich coastal flavors.",
    delivery : "Tamil Nadu 30 rupee",
   },
{ id: 311, code: "3011", name: "Dry Fish Pickle (Karuvaadu) - (400 g)", img: "images/karuvaadu1.jpeg", price: 400, description: "Our Traditional Karuvaadu Pickle (Dry Fish Pickle) is a flavorful blend of sun-dried fish slow-cooked with authentic spices. It delivers a bold, tangy, and spicy taste that pairs perfectly with hot rice or curd rice. Prepared in small batches with care, free from preservatives, and packed with rich coastal flavors.",
    delivery : "Tamil Nadu 30 rupee",
   },
{ id: 312, code: "3012", name: "Dry Fish Pickle (Karuvaadu) - (500 g)", img: "images/karuvaadu1.jpeg", price: 500, description: "Our Traditional Karuvaadu Pickle (Dry Fish Pickle) is a flavorful blend of sun-dried fish slow-cooked with authentic spices. It delivers a bold, tangy, and spicy taste that pairs perfectly with hot rice or curd rice. Prepared in small batches with care, free from preservatives, and packed with rich coastal flavors.",
    delivery : "Tamil Nadu 30 rupee",
   },
{ id: 313, code: "3013", name: "Combo Pack -- 2 × 500 g Dry Fish Pickle", img: "images/karuvaadu2.jpeg", price: 949, description: "Our Traditional Karuvaadu Pickle (Dry Fish Pickle) is a flavorful blend of sun-dried fish slow-cooked with authentic spices. It delivers a bold, tangy, and spicy taste that pairs perfectly with hot rice or curd rice. Prepared in small batches with care, free from preservatives, and packed with rich coastal flavors.",
    delivery : "Tamil Nadu 60 rupee",
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
