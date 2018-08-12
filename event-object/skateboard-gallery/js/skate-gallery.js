'use strict';
const galleryView = document.getElementsByClassName('gallery-view')[0];
const galleryNav = document.getElementsByClassName('gallery-nav')[0];
const galleryNavAnchors = galleryNav.getElementsByTagName('a');

function showSelectedImg(event) {
  event.preventDefault();
  for (const anchor of galleryNavAnchors) {
    anchor.classList.remove('gallery-current');
  }
  event.currentTarget.classList.add('gallery-current');
  galleryView.src = event.currentTarget.href;
}
 
for (const anchor of galleryNavAnchors) {
  anchor.addEventListener('click', showSelectedImg)
}
