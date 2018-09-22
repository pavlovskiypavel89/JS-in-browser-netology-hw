'use strict';
const size = document.querySelector('#sizeSwatch');
const color = document.querySelector('#colorSwatch');
const form = document.querySelector('#AddToCartForm');
const cart = document.querySelector('#quick-cart');
const snippets = {
  size: '<div class="swatch-element plain"><input type="radio" name="size"><label for=""><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>',
  color: '<div class="swatch-element color"><div class="tooltip"></div><input quickbeam="color" type="radio" name="color"><label for=""><span></span><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>',
  prod: '<div class="quick-cart-product quick-cart-product-static" style="opacity: 1;"><div class="quick-cart-product-wrap"><img><span class="s1" style="background-color: #000; opacity: .5">$800.00</span><span class="s2"></span></div><span class="count hide fadeUp"></span><span class="quick-cart-product-remove remove"></span></div>',
  cart: '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico"><span><strong class="quick-cart-text">Оформить заказ<br></strong><span id="quick-cart-price">$800.00</span></span></a>'
}
let settingsValue = localStorage.productSettings,
    defaultColor = 'blue',
    defaultSize = 'm';

function saveProdSettings(data) {
  if (event.target.tagName === 'INPUT') {
    const formData = {};
    new FormData(event.currentTarget).forEach((value, key) => formData[key] = value);
    localStorage.productSettings = JSON.stringify(formData);
  }
}

function getProdSettings() {
  try {
    if (settingsValue) { 
      return JSON.parse(settingsValue);
    }
  } catch (err) {
    console.error(`${err}`);
  }
}

function onLoad(data) {
  if (200 <= data.status < 300) {
    const response = data.json();
    if (!response.error) {
      return response;
    } else {
      throw new Error(response.message);
    }
  } else {
    throw new Error(data.statusText);
  }
}

function setColor(data) {
  color.innerHTML += snippets.color;
  const container = color.lastElementChild;
  const input = container.querySelector('input');
  const label = container.querySelector('label');
  const tooltip = container.querySelector('.tooltip');
  container.dataset.value = data.type;
  container.classList.add(data.type);
  container.classList.toggle('soldout', !data.isAvailable);
  container.classList.toggle('available', data.isAvailable);
  input.id = `swatch-1-${data.type}`;
  input.value = data.type;
  input.disabled = !data.isAvailable ? 'true' : '';
  label.setAttribute('for', `swatch-1-${data.type}`);
  label.style = `border-color: ${data.code};`;
  label.querySelector('span').style = `background-color: ${data.code};`;
  tooltip.textContent = data.title;
}

function setSize(data) {
  size.innerHTML += snippets.size;
  const container = size.lastElementChild;
  const input = container.querySelector('input');
  const label = container.querySelector('label');
  container.dataset.value = data.type;
  container.classList.add(data.type);
  container.classList.toggle('soldout', !data.isAvailable);
  container.classList.toggle('available', data.isAvailable);
  input.id = `swatch-0-${data.type}`;
  input.value = data.type;
  input.disabled = !data.isAvailable ? 'true' : '';
  label.setAttribute('for', `swatch-0-${data.type}`);
  label.innerHTML += data.title;
}

function setProd(data) {
  cart.innerHTML += snippets.prod;
  const container = cart.lastElementChild;
  const count = container.querySelector('span.count');
  const img = container.querySelector('img');
  container.id = `quick-cart-product-${data.id}`;
  count.id = `quick-cart-product-count-${data.id}`;
  count.textContent = data.quantity;
  container.querySelector('span.remove').dataset.id = data.id;
  img.src = data.pic;
  img.title = data.title;
}

function setCart(data) {
  const totalCost = data.reduce((memo, prod) => memo + (prod.quantity * prod.price), 0); 
  cart.querySelector('#quick-cart-pay').classList.toggle('open', totalCost);
  cart.querySelector('#quick-cart-price').textContent = totalCost ? totalCost : '';
}

function setData([colorsData, sizesData, cartData]) {
    const prodSettings = getProdSettings();
    settingsValue = prodSettings ? prodSettings : '';
    
    colorsData.forEach(colorData => setColor(colorData));
    defaultColor = settingsValue ? settingsValue.color : defaultColor;
    color.querySelector(`.swatch-element.${defaultColor} > input`).checked = 'true';
    
    sizesData.forEach(sizeData => setSize(sizeData));
    defaultSize = settingsValue ? settingsValue.size : defaultSize;
    size.querySelector(`.swatch-element.${defaultSize} > input`).checked = 'true';
    
    cartData.forEach(prodData => setProd(prodData));
    cart.innerHTML += snippets.cart;
    setCart(cartData);
}

function initProdCard() {
  return Promise.all([
    fetch('https://neto-api.herokuapp.com/cart/colors'), 
    fetch('https://neto-api.herokuapp.com/cart/sizes'), 
    fetch('https://neto-api.herokuapp.com/cart')
  ])
    .then(([colors, sizes, cart]) => Promise.all([
    onLoad(colors), 
    onLoad(sizes), 
    onLoad(cart)
  ]))
    .then(setData)
    .catch(err => console.error(`${err}`));
}

function addToCart() {
  if (event.target.id === 'AddToCart' || event.target.id === 'AddToCartText') {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = event.currentTarget.dataset.productId;
    formData.append('productId', id);
    
    fetch('https://neto-api.herokuapp.com/cart', {
      body: formData,
      method: 'POST',
    })
    .then(onLoad)
    .then(cartData => {
      const prodData = Array.from(cartData).find(prodData => prodData.id === id);
      if (prodData.quantity > 1) {
        cart.querySelector(`#quick-cart-product-count-${prodData.id}`).textContent = prodData.quantity;
      } else {
        setProd(prodData);
      }
      setCart(cartData);
    })
    .catch(err => console.error(`${err}`));
  }
}

function removeFromCart() {
  if (event.target.classList.contains('remove')) {
    const formData = new FormData();
    const id = event.target.dataset.id;
    formData.append('productId', id);
   
    fetch('https://neto-api.herokuapp.com/cart/remove', {
      body: formData,
      method: 'POST',
    })
    .then(onLoad)
    .then(cartData => { 
      const prodData = Array.from(cartData).find(prodData => prodData.id === id);
      if (prodData) {
        cart.querySelector(`#quick-cart-product-count-${prodData.id}`).textContent = prodData.quantity;
      } else {
        cart.removeChild(cart.querySelector(`#quick-cart-product-${id}`));
      }
      setCart(cartData);
    })
    .catch(err => console.error(`${err}`));
  }
}

document.addEventListener('DOMContentLoaded', event => initProdCard());
form.addEventListener('click', event => saveProdSettings());
form.addEventListener('click', event => addToCart());
cart.addEventListener('click', event => removeFromCart());
