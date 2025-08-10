const scriptURL = "https://script.google.com/macros/s/AKfycbxRJYqvgUfS6OWc-109azm1ca45lO5gsZvgWWmHMON9zea3OJ4YlanMG0RSfk9wAg6BwA/exec";
const form = document.getElementById("submit-to-google-sheet");

// Load saved form data from localStorage if available
const savedData = JSON.parse(localStorage.getItem("formData")) || {};
if (savedData.name) document.getElementById("name").value = savedData.name;
if (savedData.email) document.getElementById("email").value = savedData.email;
if (savedData.contact_number) document.getElementById("contact_number").value = savedData.contact_number;
if (savedData.address) document.getElementById("address").value = savedData.address;
if (savedData.pincode) document.getElementById("pincode").value = savedData.pincode;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    swal("Error", "Your cart is empty!", "error");
    return;
  }

  swal({
    title: 'Submitting...',
    allowOutsideClick: false,
    onBeforeOpen: () => {
      swal.showLoading();
    }
  });

  // Save form data to localStorage
  const saveObj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact_number: document.getElementById("contact_number").value,
    address: document.getElementById("address").value,
    pincode: document.getElementById("pincode").value,
  };
  localStorage.setItem("formData", JSON.stringify(saveObj));

  // Build product details string and calculate grand total
  let productDetailsStr = "";
  let grandTotal = 0;
  cart.forEach(product => {
    const totalPrice = product.price * product.qty;
    grandTotal += totalPrice;
    productDetailsStr += 
      `ProductCode --> ${product.code}\n` +
      `ProductName --> ${product.name}\n` +
      `ProductPrice --> ₹${product.price}\n` +
      `ProductQty --> ${product.qty}\n` +
      `TotalPrice --> ₹${totalPrice.toFixed(2)}\n\n`;
  });

  const now = new Date();
  const dateAndTime = now.toLocaleString();

  try {
    const formData = new FormData();
    formData.append("name", saveObj.name);
    formData.append("email", saveObj.email);
    formData.append("contact_number", saveObj.contact_number);
    formData.append("address", saveObj.address);
    formData.append("pincode", saveObj.pincode);
    formData.append("product_details", productDetailsStr);
    formData.append("grand_total", `Grand Total: ₹${grandTotal.toFixed(2)}`);
    formData.append("dateAndTime", dateAndTime);

    await fetch(scriptURL, { method: "POST", body: formData });

     swal.close();

    swal("Done", "Submitted Successfully.", "success");
    localStorage.removeItem("cart"); // Clear cart after submission

  } catch (error) {
     swal.close();
    swal("Error", "Something went wrong. Please try again!", "error");
  }
});
