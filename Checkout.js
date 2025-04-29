const checkoutTable = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout(items) {
  checkoutTable.innerHTML = "";
  let total = 0;

  items.forEach(item => {
    const price = typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^\d]/g, ''))
      : item.price;
    const subtotal = price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image || './images/placeholder.png'}" alt="${item.name}" style="width:50px;"></td>
      <td>${item.name || "Unnamed Product"}</td>
      <td>Rs. ${price.toLocaleString()}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${subtotal.toLocaleString()}</td>
    `;
    checkoutTable.appendChild(row);
  });

  totalEl.textContent = `Total: Rs. ${total.toLocaleString()}`;
}

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const card = document.getElementById("card").value.trim();

  if (!name || !address || !card) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Order confirmed! Redirecting to Thank You page.");
  localStorage.removeItem("cart");
  window.location.href = "Thank.html"
});

renderCheckout(cartItems);
