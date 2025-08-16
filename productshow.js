let currentProduct = null;
let currentQty = 1;


document.addEventListener("DOMContentLoaded", () => {
  // Get product from localStorage (set by index page)
  currentProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!currentProduct) {
    // Full-page message if no product found
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        flex-direction: column;
      ">
        No product found!
        <button onclick="goHome()" style="margin-top:20px; padding:10px 20px; font-size:16px;">Go to Home</button>
      </div>
    `;
    return;
  }

  // Show main product image
  document.getElementById("product-img").src = currentProduct.img;
  document.getElementById("product-img").alt = currentProduct.name;

  // Show product name, price, quantity
  document.getElementById("product-name").textContent = currentProduct.name;
  document.getElementById("product-price").textContent = currentProduct.price;
  document.getElementById("qty").textContent = currentQty;

  // Show product description
  document.getElementById("product-description").innerHTML =
    "<b>Product Details:</b><br><br>" + (currentProduct.description || "No description available.");

  // Render thumbnails if multiple images exist
  const thumbnailsDiv = document.getElementById("thumbnails");
  thumbnailsDiv.innerHTML = "";

  if (currentProduct.images && currentProduct.images.length > 0) {
    currentProduct.images.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = currentProduct.name + " thumbnail " + (index + 1);
      if (index === 0) thumb.classList.add("active");

      thumb.addEventListener("click", () => {
        document.getElementById("product-img").src = src;
        document.querySelectorAll("#thumbnails img").forEach(img => img.classList.remove("active"));
        thumb.classList.add("active");
      });

      thumbnailsDiv.appendChild(thumb);
    });
  }
});

// Change quantity
function changeQty(change) {
  currentQty += change;
  if (currentQty < 1) currentQty = 1;
  document.getElementById("qty").textContent = currentQty;
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.length; // number of products
  document.getElementById("cart-count").textContent = totalCount;
}

// Add to cart
function addToCart() {
  if (!currentProduct) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === currentProduct.id);

  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...currentProduct, qty: currentQty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
   updateCartCount();
  alert(`${currentProduct.name} (${currentQty}) added to cart!`);
}

// Navigation
function goBack() { window.history.back(); }
function goHome() { window.location.href = "index.html"; }
function goContact() { alert("Contact page coming soon!"); }
function goCart() { window.location.href = "cart.html"; }
