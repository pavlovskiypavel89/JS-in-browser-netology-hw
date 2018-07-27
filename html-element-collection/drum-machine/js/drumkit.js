'use strict';
const drumKitDrumBtns = document.getElementsByClassName('drum-kit__drum');

for (const btn of drumKitDrumBtns) {
 const drumBtnPlayer = btn.getElementsByTagName('audio')[0];
 btn.onclick = () => {
  if (drumBtnPlayer.currentTime) {
   drumBtnPlayer.pause();
   drumBtnPlayer.currentTime = 0;
  } 
  drumBtnPlayer.play();
 }
}
