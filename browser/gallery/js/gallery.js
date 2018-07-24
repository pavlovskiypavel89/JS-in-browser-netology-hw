'use strict';
const gallery = document.getElementById('currentPhoto');
const nextButton = document.getElementById('nextPhoto');
const prevButton = document.getElementById('prevPhoto');
const gallerySRCs = [
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/breuer-building.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/guggenheim-museum.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/headquarters.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/IAC.jpg', 
  'https://netology-code.github.io/hj-homeworks/browser/gallery/i/new-museum.jpg'
];
const lastImageNum = gallerySRCs.length - 1;


function flipOnNext() {
  if (gallerySRCs.includes(gallery.src)) {
    const currentImageNum = gallerySRCs.indexOf(gallery.src);
    let nextImageNum = currentImageNum + 1;
    nextImageNum = (currentImageNum !== lastImageNum) ? nextImageNum : 0;
    gallery.src = gallerySRCs[nextImageNum];
  }
}

function flipOnPrev() {
  if (gallerySRCs.includes(gallery.src)) {
    const currentImageNum = gallerySRCs.indexOf(gallery.src);
    let prevImageNum = currentImageNum - 1;
    prevImageNum = (currentImageNum !== 0) ? prevImageNum : lastImageNum;
    gallery.src = gallerySRCs[prevImageNum]; 
  }
}

gallery.src = gallerySRCs[0];
nextButton.onclick = flipOnNext;
prevButton.onclick = flipOnPrev;