// =======================
// Cart Display on Page
// =======================
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
const cartItemsContainer = document.getElementById("cartItems");

cart.forEach(item => {
  const subtotal = item.price * item.qty;
  total += subtotal;
  
  cartItemsContainer.innerHTML += `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div>
        <div>${item.name}</div>
        <small>Qty: ${item.qty} × ₹${item.price}</small>
      </div>
      <div>₹${subtotal.toFixed(2)}</div>
    </div>
  `;
});

document.getElementById("cartTotal").innerText = `Total: ₹${total.toFixed(2)}`;

// =======================
// Form Handling
// =======================
const scriptURL = "https://script.google.com/macros/s/AKfycbxNuqJkL9i7UR7rIKfDDGMNoFG4j8_sSgzJ58CAzakEn1UD7g8RKXuzXRIe8TNn2xTp6g/exec";
const form = document.getElementById("submit-to-google-sheet");

// Load saved form data from localStorage
const savedData = JSON.parse(localStorage.getItem("formData")) || {};
if (savedData.name) document.getElementById("name").value = savedData.name;
if (savedData.email) document.getElementById("email").value = savedData.email;
if (savedData.contact_number) document.getElementById("contact_number").value = savedData.contact_number;
if (savedData.address) document.getElementById("address").value = savedData.address;
if (savedData.city) document.getElementById("city").value = savedData.city;
if (savedData.state) document.getElementById("state").value = savedData.state;
if (savedData.pincode) document.getElementById("pincode").value = savedData.pincode;

// =======================
// Submit Form to Google Sheets
// =======================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    swal("Error", "Your cart is empty!", "error");
    return;
  }

  swal({
    title: 'Submitting...',
    allowOutsideClick: false,
    onBeforeOpen: () => swal.showLoading()
  });

  // Save form data in localStorage
  const saveObj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact_number: document.getElementById("contact_number").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
  };
  localStorage.setItem("formData", JSON.stringify(saveObj));

  // Build product details string
  let productDetailsStr = "";
  cart.forEach(product => {
    const subtotal = product.price * product.qty;
    productDetailsStr += 
      `Product Code: ${product.code}\n` +
      `Product Name: ${product.name}\n` +
      `Price: ₹${product.price}\n` +
      `Qty: ${product.qty}\n` +
      `Total: ₹${subtotal.toFixed(2)}\n\n`;
  });

const saveObjec = {
  address: document.getElementById("address")?.value.trim() || "",
  city: document.getElementById("city")?.value.trim() || "",
  state: document.getElementById("state")?.value.trim() || "",
  pincode: document.getElementById("pincode")?.value.trim() || ""
};

const fullAddress = [saveObjec.address, saveObjec.city, saveObjec.state, saveObjec.pincode]
  .filter(Boolean) // remove empty strings
  .join(",\n");

  const dateAndTime = new Date().toLocaleString();

  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const orderId = `KS${day}${month}${hours}${minutes}${seconds}`;

  try {
    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("name", saveObj.name);
    formData.append("email", saveObj.email);
    formData.append("contact_number", saveObj.contact_number);
    formData.append("address", fullAddress);
   // formData.append("city", saveObj.city);
   // formData.append("state", saveObj.state);
   // formData.append("pincode", saveObj.pincode);
    formData.append("product_details", productDetailsStr);
    formData.append("grand_total", `Grand Total: ₹${total.toFixed(2)}`);
    formData.append("dateAndTime", dateAndTime);

    await fetch(scriptURL, { method: "POST", body: formData });

    swal.close();
    //swal("Done", "Order Submitted Successfully!", "success");
    swal("Done", `Order Submitted Successfully!\nYour Order ID: ${orderId}`, "success");
    //localStorage.removeItem("cart");

  } catch (error) {
    swal.close();
    swal("Error", "Something went wrong. Please try again!", "error");
  }
});
