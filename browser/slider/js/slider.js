'use strict';
const slider = document.getElementById('slider');
const sliderSRCs = [
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-jump.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-on-foot.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-playground.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax-top-view.png', 
  'https://netology-code.github.io/hj-homeworks/browser/slider/i/airmax.png'
];
const lastSlideNum = sliderSRCs.length - 1;
const delay = 5000;

let currentSlideNum = 0;
slider.src = sliderSRCs[currentSlideNum];
setInterval(() => {
  currentSlideNum++;
  currentSlideNum = (currentSlideNum <= lastSlideNum) ? currentSlideNum : 0;
  slider.src = sliderSRCs[currentSlideNum];
}, delay);
