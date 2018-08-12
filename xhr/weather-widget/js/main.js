'use strict';
const request = new XMLHttpRequest();
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather');
request.send();
function onLoadReqst() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  } else {
    console.log(`Невозможно отобразить виджет погоды.\nОшибка ${request.status}: ${request.statusText}.`);
  }
}
request.addEventListener('load', onLoadReqst);