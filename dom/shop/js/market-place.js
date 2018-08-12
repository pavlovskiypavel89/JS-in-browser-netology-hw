'use strict';
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const btns = document.querySelectorAll('.box > button.add');
let totalPrice = 0;
let count = 0;

function getPriceFormatted(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function addToCart(event) {
  const priceToAdd = event.currentTarget.getAttribute('data-price');
  if (!isNaN(Number(priceToAdd))) {
    totalPrice += Number(priceToAdd);
    const formattedPrice = getPriceFormatted(totalPrice);
    cartTotalPrice.innerHTML = formattedPrice;
    cartCount.innerHTML = ++count;
  }
}

for (const btn of btns) {
  btn.addEventListener('click', addToCart);
}