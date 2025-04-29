document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".cart-btn");
  const cartAmount = document.getElementById("cart-amount");

  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartAmount.textContent = total.toLocaleString();
  }

  updateCartDisplay();

  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const container = button.closest(".container-1");
      const id = button.getAttribute("data-id");
      const name = container.querySelector(".product-title").textContent;
      const priceText = container.querySelector(".product-price").textContent;
      const price = parseFloat(priceText.replace(/[^\d]/g, ''));
      const image = container.querySelector("img").getAttribute("src");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: id,
          name: name,
          price: price,
          quantity: 1,
          image: image
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
      alert(`${name} added to cart.`);
    });
  });
});
