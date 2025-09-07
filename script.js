// ---------------- CART TOGGLE ----------------
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector(".cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach((button) => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
  });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
  const productImgSrc = productBox.querySelector("img").src;
  const productTitle = productBox.querySelector(".product-title").innerText;
  const productPrice = productBox.querySelector(".price").innerText;

  const cartItems = cartContent.querySelectorAll(".cart-product-title");
  for (let item of cartItems) {
    if (item.innerText === productTitle) {
      alert("You have already added this item to the cart");
      return;
    }
  }

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${productImgSrc}" alt="" class="cart-img">
    <div class="cart-detail">
      <h2 class="cart-product-title">${productTitle}</h2>
      <span>${productPrice}</span>
      <div class="cart-quantity">
        <button id="decreament">-</button>
        <span class="qty-number">1</span>
        <button id="increament">+</button>
      </div>
    </div>
    <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
  `;
  cartContent.appendChild(cartBox);

  cartBox.querySelector(".cart-remove").addEventListener("click", () => {
    cartBox.remove();
    updateCartCount(-1);
    updateTotalPrice();
  });

  cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
    const numberElement = cartBox.querySelector(".qty-number");
    const decreamentButton = cartBox.querySelector("#decreament");
    let quantity = numberElement.textContent;
    if (event.target.id === "decreament" && quantity > 1) {
      quantity--;
      if (quantity ===1) {
        decreamentButton.style.color = "#999";
      }
    }
    else if (event.target.id === "increament") {
      quantity++;
      decreamentButton.style.color = "#333";
    }
    numberElement.textContent = quantity;
    updateTotalPrice();
  });
  updateCartCount(1);
  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".qty-number");
    const price = priceElement.textContent.replace("$", "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
}

let cartItemCount = 0;
const cartCountElement = change => {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else{
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty");
  }
  cartBoxes.forEach(cartBox => cartBox.remove());
  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  alert("Your order is placed");
});