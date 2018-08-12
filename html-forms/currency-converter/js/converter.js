'use strict';
const converter = document.querySelector('#content');
const input = converter.querySelector('#source');
const fromSelect = converter.querySelector('#from');
const toSelect = converter.querySelector('#to');
const output = converter.querySelector('#result');
const preloader = document.querySelector('#loader');

const exchangeRatesReqst = new XMLHttpRequest();
exchangeRatesReqst.open('GET', 'https://neto-api.herokuapp.com/currency');
exchangeRatesReqst.addEventListener('loadstart', onLoadStart);
exchangeRatesReqst.addEventListener('load', onLoad);
exchangeRatesReqst.addEventListener('error', onError);
exchangeRatesReqst.addEventListener('loadend', onLoadEnd);
exchangeRatesReqst.send();

function outputValue() {
  output.value = (input.value * fromSelect.value / toSelect.value).toFixed(2);
}

function initSelects(rates) {
  [fromSelect, toSelect].forEach(select => {
    rates.forEach((rate, index) => {
      select.innerHTML += '<option></option>';
      const option = select.querySelectorAll('option').item(index);
      option.setAttribute('label', rate.code);
      option.value = rate.value;
    });
    select.addEventListener('change', outputValue);
  });
}

function onLoadStart() {
  preloader.classList.remove('hidden');
}

function onLoad(event) {
  if (event.currentTarget.status === 200) {
    const exchangeRates = JSON.parse(exchangeRatesReqst.responseText);
    initSelects(exchangeRates);
    outputValue();
    input.addEventListener('input', outputValue);
  } else {
    output.value = `Невозможно отобразить данные курсов валют.\nОшибка ${event.currentTarget.status}: ${event.currentTarget.statusText}.`;
  }
}

function onError() {
  output.value = 'Невозможно отобразить данные курсов валют.\nОшибка сети.';
}

function onLoadEnd() {
  preloader.classList.add('hidden');
  converter.classList.remove('hidden');
}