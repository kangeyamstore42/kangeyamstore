// Products data with images array (this cart page to showed) importent*****
const products = [
  {
    id: 1,
    code: "0001",
    name: "Hair Oil 250ml",
    img: "images/ecofriendly-beauty-product.jpg",
    price: 130,
    description: "A nourishing hair oil enriched with natural extracts to strengthen and hydrate your hair."
  },
  {
    id: 2,
    code: "0002",
    name: "Hair Oil 500ml",
    img: "images/hair-serum-bottle-with-brown-hair.jpg",
    price: 180,
    description: "Larger bottle of premium hair oil for deep conditioning and shine."
  },
  {
    id: 3,
    code: "0003",
    name: "Hair Oil 100ml",
    img: "images/front-view-oil-made-from-green-plant.jpg",
    price: 80,
    description: "Compact and potent formula for daily hair nourishment."
  },
  {
    id: 4,
    code: "0004",
    name: "Peanut Candy",
    price: 150,
    img: "images/vecteezy_close-up-of-sweet-and-savory-peanut-brittle-candy_68019123.jpg",
    description: "Delicious crunchy peanut brittle candy, perfect for snacking."
  },
  {
    id: 5,
    code: "0005",
    name: "Peanut Candy",
    price: 150,
    img: "images/vecteezy_close-up-of-a-stack-of-delicious-peanut-brittle-candy-bars_66482499.jpg",
    description: "Sweet and savory peanut brittle bars made fresh daily."
  },
  {
    id: 6,
    code: "0006",
    name: "T-Shirt",
    price: 20,
    img: "tshirt.jpg",
    description: "Comfortable cotton t-shirt available in multiple sizes and colors."
  },
  {
    id: 7,
    code: "0007",
    name: "Jeans",
    price: 40,
    img: "jeans.jpg",
    description: "Stylish denim jeans with perfect fit for everyday wear."
  }
];



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




let currentProduct = null;
let currentQty = 1;

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"), 10);

function loadProduct() {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) {
    alert("Product not found");
    window.location.href = "index.html";
    return;
  }

  // Use first image in images array or fallback
  const imgSrc = (currentProduct.images && currentProduct.images.length > 0) ? currentProduct.images[0] : (currentProduct.img || currentProduct.image || "images/ecofriendly-beauty-product.jpg");

  document.getElementById("product-img").src = imgSrc;
  document.getElementById("product-img").alt = currentProduct.name;
  document.getElementById("product-name").textContent = currentProduct.name;
  document.getElementById("product-price").textContent = currentProduct.price;
  document.getElementById("qty").textContent = currentQty;

  // Show description text
  document.getElementById("product-description").innerHTML = "<b>Product Details:</b>\n\n " + (currentProduct.description || "No description available.");

  // Render thumbnails
  const thumbnailsDiv = document.getElementById("thumbnails");
  thumbnailsDiv.innerHTML = ""; // Clear previous

  if (currentProduct.images && currentProduct.images.length > 1) {
    currentProduct.images.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = currentProduct.name + " thumbnail " + (index + 1);
      if(index === 0) thumb.classList.add("active");

      thumb.addEventListener("click", () => {
        document.getElementById("product-img").src = src;
        // Update active border
        document.querySelectorAll("#thumbnails img").forEach(img => img.classList.remove("active"));
        thumb.classList.add("active");
      });

      thumbnailsDiv.appendChild(thumb);
    });
  }
}

function changeQty(change) {
  currentQty += change;
  if (currentQty < 1) currentQty = 1;
  document.getElementById("qty").textContent = currentQty;
}

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === currentProduct.id);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({...currentProduct, qty: currentQty});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${currentProduct.name} (${currentQty}) added to cart!`);
}

function goBack() {
  window.history.back();
}

function goHome() {
  window.location.href = "index.html";
}
function goContact() {
  alert("Contact page coming soon!");
}
function goCart() {
  window.location.href = "cart.html";
}

loadProduct();
