const scriptURL = "https://script.google.com/macros/s/AKfycbwL-121N0Zoyot30Y3dSrZXYCSPaUBcGVC-XvFjJVWpshcXLxcR07KzunK7nELUEXMJWA/exec"; // replace with your script URL

const fetchBtn = document.getElementById("fetchOrder");
const cancelBtn = document.getElementById("cancelOrderBtn");
const orderDetailsDiv = document.getElementById("order-details");
const loadingDiv = document.getElementById("loading");

// Fetch order details
fetchBtn.addEventListener("click", async () => {
  const orderId = document.getElementById("order_id").value.trim();
  if (!orderId) {
    swal("Error", "Please enter your Order ID", "error");
    return;
  }

  // Show spinner
  loadingDiv.style.display = "block";
  orderDetailsDiv.style.display = "none";

  try {
    const response = await fetch(`${scriptURL}?order_id=${orderId}`);
    const data = await response.json();

    // Hide spinner
    loadingDiv.style.display = "none";

    if (data.error) {
      swal("Error", data.error, "error");
      return;
    }

    const order = data.order;
    document.getElementById("name").innerText = order.name;
    document.getElementById("email").innerText = order.email;
    document.getElementById("product_details").innerText = order.product_details;
    document.getElementById("grand_total").innerText = order.grand_total;

    orderDetailsDiv.style.display = "block";

  } catch (err) {
    loadingDiv.style.display = "none";
    swal("Error", "Failed to fetch order", "error");
    console.error(err);
  }
});

// Cancel order
cancelBtn.addEventListener("click", async () => {
  const orderId = document.getElementById("order_id").value.trim();
  const reason = document.getElementById("reason").value.trim() || "No reason provided";

  if (!orderId) {
    swal("Error", "Order ID missing", "error");
    return;
  }

  // Show loading
  swal({
    title: 'Cancelling...',
    allowOutsideClick: false,
    buttons: false
  });

  try {
    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("status", "Cancelled");
    formData.append("reason", reason);
    formData.append("cancel_date", new Date().toLocaleString());

    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const resultText = await response.text();

    swal("Success", resultText, "success");
    document.getElementById("reason").value = "";

  } catch (err) {
    swal("Error", "Failed to cancel order", "error");
    console.error(err);
  }
});
function goHome() {
      window.location.href = '/index.html';
    }