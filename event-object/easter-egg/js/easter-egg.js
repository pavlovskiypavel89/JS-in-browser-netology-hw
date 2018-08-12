'use strict';
const nav = document.getElementsByTagName('nav')[0];
const secretSiteContent = document.getElementsByClassName('secret')[0];
const secretString = 'YTNJKJUBZ'; // нетология

function openOrCloseHiddenMenu(event) {
  if (event.altKey && event.ctrlKey && event.code === 'KeyT') {
    nav.classList.toggle('visible');
  }
}

function checkSetOfTypedChars(typedChar) {
  if (secretString[amtOfTypedSecretChars] === typedChar) {
    amtOfTypedSecretChars++;
    if (amtOfTypedSecretChars === secretString.length)  {
      secretSiteContent.classList.add('visible');
    }
  } else {
    amtOfTypedSecretChars = 0;
  }
}

function showSecretContent(event) {
  const typedChar = event.code.replace('Key', '');
  checkSetOfTypedChars(typedChar);
}


document.addEventListener('keydown', openOrCloseHiddenMenu);

let amtOfTypedSecretChars = 0;
document.addEventListener('keydown', showSecretContent);
