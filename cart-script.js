  const tbody = document.querySelector("#cart-table tbody");
  const cardContainer = document.getElementById("cart-cards"); // mobile view container
  const totalPriceDiv = document.getElementById("total-price");

  // Load cart from localStorage and render
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    tbody.innerHTML = "";
    cardContainer.innerHTML = "";

    if (cart.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-msg">Your cart is empty</td></tr>`;
      cardContainer.innerHTML = `<p class="empty-msg">Your cart is empty</p>`;
      totalPriceDiv.textContent = "";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      if (!item.code) {
        item.code = String(item.id).padStart(4, "0");
      }

      const itemTotal = item.price * item.qty;
      total += itemTotal;

      /* ✅ Desktop Table Row */
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.img}" class="cart-img"></td>
        <td>${item.name}</td>
        <td class="cart-code">${item.code}</td>
        <td class="cart-price">₹${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          <span style="margin:0 8px;">${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td class="cart-total">₹${itemTotal.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${index})">Remove</button></td>
      `;
      tbody.appendChild(row);

      /* ✅ Mobile Card */
      const card = document.createElement("div");
      card.className = "cart-card";
      card.innerHTML = `
        <img src="${item.img}" class="cart-img">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
          <p>Qty: 
            <button onclick="changeQty(${index}, -1)">-</button>
            <span style="margin:0 6px;">${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </p><br>
          <p class="cart-total"><b>Total:</b> ₹${itemTotal.toFixed(2)}</p><br>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cardContainer.appendChild(card);
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

  // Remove product from cart
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Add product to cart
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].qty += 1;
    } else {
      product.qty = 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  // Navigation
  function goaddress() {
    window.location.href = "address.html";
  }
  function goHome() {
    window.location.href = "index.html";
  }

  // Init
  loadCart();
