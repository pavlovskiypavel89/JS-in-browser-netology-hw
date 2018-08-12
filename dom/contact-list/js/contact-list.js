'use strict';
const contacts = JSON.parse(loadContacts());
const [contactsList] = document.getElementsByClassName('contacts-list');

let parsedHTMLCode = '';
for (const contact of contacts) {
  let liContent = '';
  let strContent = '';
  for (const atr in contact) {
    if (atr !== 'name') {
      liContent += `data-${atr}="${contact[atr]}"`
    } else {
      strContent = `${contact[atr]}`;
    }
  }
  parsedHTMLCode += `<li ${liContent}><strong>${strContent}</strong></li>`;
}
contactsList.innerHTML = parsedHTMLCode;
