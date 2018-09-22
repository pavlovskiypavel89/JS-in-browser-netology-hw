'use strict';
const signInForm = document.querySelector('form.sign-in-htm');
const signUpForm = document.querySelector('form.sign-up-htm');
const urls = {
  signInLink: 'https://neto-api.herokuapp.com/signin',
  signUpLink: 'https://neto-api.herokuapp.com/signup'
}

function submit() {
  if (event.target.classList.contains('button')) {
    event.preventDefault();
    const output = event.currentTarget.querySelector('output.error-message');
    
    function sendRequest(url, data) {
      const request = new XMLHttpRequest();
      request.addEventListener('load', onLoad);
      request.addEventListener('error', onError);
      request.open('POST', url);
      request.setRequestHeader('Content-type', 'application/json');
      request.send(JSON.stringify(data));

      function onLoad(event) {
        if (event.currentTarget.status === 200) {
          const response = JSON.parse(event.currentTarget.responseText);
          output.value = !response.error ? `Пользователь ${response.name} успешно ${url === urls.signInLink ? 'авторизован' : 'зарегистрирован'}` : response.message;
        } else {
          output.value = `Невозможно отправить данные формы. Ошибка ${event.currentTarget.status}: ${event.currentTarget.statusText}`;
        }
      }

      function onError(event) {
        output.value = 'Невозможно отправить данные формы. Ошибка сети';
      }
    }
    
    const url = event.currentTarget.classList.contains('sign-in-htm') ? urls.signInLink : urls.signUpLink;
    const formData = {};
    new FormData(event.currentTarget).forEach((value, key) => formData[key] = value);
    sendRequest(url, formData);
  }
}

[signInForm, signUpForm].forEach(form => form.addEventListener('click', event => submit()));
