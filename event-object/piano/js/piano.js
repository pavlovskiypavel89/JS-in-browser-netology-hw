'use strict';
const soundsTitles = ['first', 'second', 'third', 'fourth', 'fifth'];
const piano = document.getElementsByClassName('set')[0];
const pianoBtns = piano.getElementsByTagName('li');
const pianoBtnsArr = Array.from(pianoBtns);

function setLowerSounds() {
  if (event.altKey || (event.altKey && event.repeat)) {
    piano.classList.remove('middle');
    piano.classList.add('higher');
  }
}

function setHigherSounds() {
  if (event.shiftKey || (event.shiftKey && event.repeat)) {
    piano.classList.remove('middle');
    piano.classList.add('lower');
  } 
}

function setMiddleSounds() {
  piano.classList.remove('lower');
  piano.classList.remove('higher');
  piano.classList.add('middle');
}

function playSelectedSound(event) {
  const soundPacksName = piano.classList.contains('middle') ? 'middle' : piano.classList.contains('lower') ? 'lower' : 'higher';
  const soundTitleNum = pianoBtnsArr.findIndex(btn => btn === event.currentTarget);
  const player = event.currentTarget.getElementsByTagName('audio')[0];
  player.src = `${'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/' + soundPacksName + '/' + soundsTitles[soundTitleNum] + '.mp3'}`;
  player.play();
}

document.addEventListener('keydown', setLowerSounds);
document.addEventListener('keydown', setHigherSounds);
document.addEventListener('keyup', setMiddleSounds);
for (const btn of pianoBtns) {
  btn.addEventListener('click', playSelectedSound);
}
