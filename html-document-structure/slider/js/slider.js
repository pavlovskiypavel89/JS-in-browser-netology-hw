'use strict';
const sliders = document.querySelectorAll('.slider');

function initSlider(container) {
  const slideList = container.querySelector('.slides');
  const navBtns = container.querySelector('.slider-nav').querySelectorAll('a');
  const forwardBtns = Array.from(navBtns).filter(({ dataset }) => (dataset.action === 'next' || dataset.action === 'last'));
  const backBtns = Array.from(navBtns).filter(({ dataset }) => (dataset.action === 'prev' || dataset.action === 'first'));
  
  function flipOn(isForward) {
    const currentSlide = slideList.querySelector('.slide-current');
    const nextSlide = isForward ? 
          (event.target.dataset.action === 'next' ? currentSlide.nextElementSibling : slideList.lastElementChild) :   
          (event.target.dataset.action === 'prev' ? currentSlide.previousElementSibling : slideList.firstElementChild);
    const endingSlide = (nextSlide === currentSlide);
    
    if (nextSlide && !endingSlide) {
      currentSlide.classList.remove('slide-current');
      nextSlide.classList.add('slide-current');
      switch (nextSlide) {
          case slideList.lastElementChild: 
          forwardBtns.forEach(btn => btn.classList.add('disabled'));
          backBtns.forEach(btn => btn.classList.remove('disabled'));
          break;
          
          case slideList.firstElementChild:
          forwardBtns.forEach(btn => btn.classList.remove('disabled'));
          backBtns.forEach(btn => btn.classList.add('disabled'));
          break;

          default:
          forwardBtns.forEach(btn => btn.classList.remove('disabled'));
          backBtns.forEach(btn => btn.classList.remove('disabled'));
      } 
    } else { 
      return ; 
    }  
  }
  
  //устанавливаем первый слайд и настраиваем кнопки:
  slideList.firstElementChild.classList.add('slide-current');
  forwardBtns.forEach(btn => btn.addEventListener('click', event => flipOn(true)));
  backBtns.forEach(btn => {
    btn.addEventListener('click', event => flipOn(false));
    btn.classList.add('disabled');
  }); 
}

Array.from(sliders).forEach(slider => initSlider(slider));