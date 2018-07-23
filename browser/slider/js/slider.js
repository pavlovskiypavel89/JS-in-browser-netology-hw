'use strict';
const slider = document.getElementById('slider');
const sliderSRCs = [
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'
];
const delay = 5000;

function slidersCycle(slider, imagesLinks) {
  imagesLinks.forEach((curntImageLink, curntImageIndex) => {
    const imageShowDelay = curntImageIndex * delay;
    setTimeout(() => (slider.src = curntImageLink), imageShowDelay);
  });
}

function startSlider(slider, imagesLinks) {
  const cyclesIntervalDelay = imagesLinks.length * delay;
  setInterval(() => slidersCycle(slider, imagesLinks), cyclesIntervalDelay);
  slidersCycle(slider, imagesLinks);
}

startSlider(slider, sliderSRCs);
