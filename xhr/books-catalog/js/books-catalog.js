'use strict';
const content = document.querySelector('#content');
const catalogReqst = new XMLHttpRequest();
catalogReqst.addEventListener('load', onLoad);
catalogReqst.addEventListener('error', onError);
catalogReqst.open('GET', 'https://neto-api.herokuapp.com/book/');
catalogReqst.send();

function onLoad(event) {
  if (event.currentTarget.status === 200) {
    const booksData = JSON.parse(event.currentTarget.responseText);
    content.innerHTML = '';
    booksData.forEach(({ title, author, info, price, cover }, bookIndex) => {
      content.innerHTML += '<li><img></li>';
      const li = content.querySelectorAll('li').item(bookIndex);
      const img = li.querySelector('img');
      li.dataset['title'] = title;
      li.dataset['author'] = author.name;
      li.dataset['info'] = info;
      li.dataset['price'] = price;
      img.setAttribute('src', cover.small);
    });
  } else {
    console.log(`Невозможно отобразить содержимое страницы.\nОшибка ${event.currentTarget.status}: ${event.currentTarget.statusText}.`);
  } 
}

function onError() {
  console.log(`Невозможно отобразить содержимое страницы.\nОшибка сети.`)
}