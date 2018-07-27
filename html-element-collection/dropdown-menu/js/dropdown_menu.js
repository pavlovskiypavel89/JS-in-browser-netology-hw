'use strict';
const dropdownButton = document.getElementsByClassName('wrapper-dropdown')[0];
const dropdownMenuItems = dropdownButton.getElementsByClassName('dropdown')[0].getElementsByTagName('li');

function toggleActiveClass() {
  this.classList.toggle('active');
}

dropdownButton.onclick = toggleActiveClass;
for (const menuItem of dropdownMenuItems) {
  menuItem.onclick = toggleActiveClass;
}