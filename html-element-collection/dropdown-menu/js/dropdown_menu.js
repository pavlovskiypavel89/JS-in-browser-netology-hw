'use strict';
const dropdownButton = document.getElementsByClassName('wrapper-dropdown')[0];

function toggleActiveClass() {
  this.classList.toggle('active');
}

dropdownButton.onclick = toggleActiveClass;
