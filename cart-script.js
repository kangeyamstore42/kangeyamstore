const tbody = document.querySelector("#cart-table tbody");
const totalPriceDiv = document.getElementById("total-price");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-msg">Your cart is empty</td></tr>`;
    totalPriceDiv.textContent = "";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    // code is for display only — no matching by code here
    if (!item.code) {
      item.code = String(item.id).padStart(4, "0"); // Display id as code if no code present
    }

    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${item.img}" alt="${item.name}" 
          style="width:40px; height:40px; object-fit:cover; margin-right:8px; vertical-align:middle;">
        ${item.name}
      </td>
      <td>${item.code}</td>
      <td>₹${item.price}</td>
      <td>
        <button onclick="changeQty(${index}, -1)">-</button>
        <span style="margin:0 8px;">${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>₹${itemTotal.toFixed(2)}</td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
    tbody.appendChild(row);
  });

  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
  totalPriceDiv.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Change quantity for product at index
function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newQty = cart[index].qty + change;
  if (newQty < 1) newQty = 1;
  cart[index].qty = newQty;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Remove product from cart at index
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Add product to cart using id to match
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Match product by id
  let existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex !== -1) {
    // Product exists, increase quantity
    cart[existingIndex].qty += 1;
  } else {
    // New product
    product.qty = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// For navigation (optional)
function goHome() {
  window.location.href = "address.html";
}

loadCart();
