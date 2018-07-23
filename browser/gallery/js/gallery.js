'use strict';
const photoGallery = document.getElementById('currentPhoto');
const gallerySRCs = [
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];

function flipOnNext(galleryImagesLinks, curntImageNum, lastImageNum) {
  const gallery = document.getElementById('currentPhoto');
  const nextImageNum = curntImageNum + 1;
  (curntImageNum !== lastImageNum) ? gallery.src = galleryImagesLinks[nextImageNum] : gallery.src = galleryImagesLinks[0];
}

function flipOnPrev(galleryImagesLinks, curntImageNum, lastImageNum) {
  const gallery = document.getElementById('currentPhoto');
  const prevImageNum = curntImageNum - 1;
  (curntImageNum !== 0) ? gallery.src = galleryImagesLinks[prevImageNum] : gallery.src = galleryImagesLinks[lastImageNum];
}

function clickOnGalleryButton() {
  const gallery = document.getElementById('currentPhoto');
  const nextButton = document.getElementById('nextPhoto');
  const prevButton = document.getElementById('prevPhoto');
  const currentImageLink = gallery.src;
  //const currentImageLink = gallery.src.replace(/http:|https:/, ''); -  this code is used for "gallerySRCs" links starting on "// ..." (without "http:" or "https:").
  const currentImageNumber = gallerySRCs.indexOf(currentImageLink);
  const lastImageNumber = gallerySRCs.length - 1;

  if (gallerySRCs.includes(currentImageLink) && this === nextButton) {
    flipOnNext(gallerySRCs, currentImageNumber, lastImageNumber);
  } else if (gallerySRCs.includes(currentImageLink) && this === prevButton) {
    flipOnPrev(gallerySRCs, currentImageNumber, lastImageNumber);
  }
}

photoGallery.src = gallerySRCs[0];
for (const btnID of ['nextPhoto', 'prevPhoto']) {
  const btn = document.getElementById(btnID);
  btn.onclick = clickOnGalleryButton;
}