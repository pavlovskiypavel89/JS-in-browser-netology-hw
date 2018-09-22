'use strict';
const itemList = document.querySelector('main.items-list');
function addItemToCart() {
  if (event.target.classList.contains('add-to-cart')) {
    event.preventDefault();
    const item = {
      'title': event.target.dataset.title,
      'price': event.target.dataset.price
    }
    addToCart(item);
  }
}
itemList.addEventListener('click', event => addItemToCart());
