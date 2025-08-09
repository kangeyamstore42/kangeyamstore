const scriptURL = "https://script.google.com/macros/s/AKfycbxRJYqvgUfS6OWc-109azm1ca45lO5gsZvgWWmHMON9zea3OJ4YlanMG0RSfk9wAg6BwA/exec";
const form = document.getElementById("submit-to-google-sheet");

// Load saved form data
const savedData = JSON.parse(localStorage.getItem("formData")) || {};
if (savedData.name) document.getElementById("name").value = savedData.name;
if (savedData.email) document.getElementById("email").value = savedData.email;
if (savedData.contact_number) document.getElementById("contact_number").value = savedData.contact_number;
if (savedData.gender) document.getElementById("gender").value = savedData.gender;
if (savedData.message) document.getElementById("message").value = savedData.message;
if (savedData.age) document.getElementById("age").checked = savedData.age === "Yes";
if (savedData.ex) document.getElementById("ex").checked = savedData.ex === "Yes";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    swal("Error", "Your cart is empty!", "error");
    return;
  }

  const ex = document.getElementById("ex").checked;
  const age = document.getElementById("age").checked;

  // Save address info for later
  const saveObj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact_number: document.getElementById("contact_number").value,
    gender: document.getElementById("gender").value,
    message: document.getElementById("message").value,
    age: age ? "Yes" : "No",
    ex: ex ? "Yes" : "No",
  };
  localStorage.setItem("formData", JSON.stringify(saveObj));

  try {
    // Send one request per product
    for (let product of cart) {
      const formData = new FormData();
      formData.append("name", saveObj.name);
      formData.append("email", saveObj.email);
      formData.append("contact_number", saveObj.contact_number);
      formData.append("gender", saveObj.gender);
      formData.append("message", saveObj.message);
      formData.append("age", saveObj.age);
      formData.append("ex", saveObj.ex);
      // Product details (hidden from UI)
      formData.append("product_details", `${product.code} - ${product.name} - ₹${product.price}`);

      await fetch(scriptURL, { method: "POST", body: formData });
    }

    swal("Done", "Submitted Successfully.", "success");
    localStorage.removeItem("cart"); // Clear cart after submission

  } catch (error) {
    swal("Error", "Something went wrong. Please try again!", "error");
  }
});
