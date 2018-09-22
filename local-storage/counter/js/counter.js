'use strict';
const counter = document.querySelector('#counter');
const btns = document.querySelector('.wrap-btns');
let value = localStorage.counter;
counter.textContent = value = value ? value : 0;

function btnClick() {
  if (event.target.id === 'increment') {
    ++value;
  } else if (event.target.id === 'decrement') {
    value = value > 0 ? (--value) : 0;    
  } else if (event.target.id === 'reset') {
    value = 0;
  }
  counter.textContent = localStorage.counter = value;
}

btns.addEventListener('click', event => btnClick());
