const cartTable = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(items) {
  cartTable.innerHTML = "";
  let total = 0;

  items.forEach((item, index) => {
    const price = typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^\d]/g, ''))
      : item.price;
    const subtotal = price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name || "Unnamed Product"}</td>
      <td>Rs. ${price.toLocaleString()}</td>
      <td>
        <input type="number" class="quantity-input" min="1" value="${item.quantity}" data-index="${index}" />
      </td>
      <td class="subtotal">Rs. ${subtotal.toLocaleString()}</td>
    `;
    cartTable.appendChild(row);
  });

  totalEl.textContent = `Total: Rs. ${total.toLocaleString()}`;

  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("input", function () {
      const index = parseInt(this.getAttribute("data-index"));
      const newQuantity = parseInt(this.value);

      if (!isNaN(newQuantity) && newQuantity >= 1) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart(cartItems);
      }
    });
  });
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Redirecting to checkout...");
  document.location.href = 'Checkout.html';
});

document.getElementById("clearBtn").addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartItems = [];
  renderCart(cartItems);
});

document.getElementById("addFavBtn").addEventListener("click", () => {
  localStorage.setItem("favourites", JSON.stringify(cartItems));
  alert("Current cart saved to favourites.");
});

document.getElementById("applyFavBtn").addEventListener("click", () => {
  const fav = JSON.parse(localStorage.getItem("favourites"));
  if (fav) {
    cartItems = fav;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart(cartItems);
  } else {
    alert("No favourites found!");
  }
});

renderCart(cartItems);
