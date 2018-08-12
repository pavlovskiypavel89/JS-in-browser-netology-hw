'use strict';
const form = document.querySelector('.contentform');
const userformMsg = document.querySelector('#output');
const inputsArr = Array.from(form.querySelectorAll('.form-group > input, .form-group > textarea'));
const outputsArr = Array.from(userformMsg.querySelectorAll('output'));
const btns = document.querySelectorAll('form .button-contact, main .button-contact'); 

function toggleUI() {
  form.classList.toggle('hidden');
  userformMsg.classList.toggle('hidden');
}

let submitBtn, forwardBtn;
for (const btn of btns) {
  btn.getAttribute('type') === 'submit' ? (submitBtn = btn) : (forwardBtn = btn); 
  btn.addEventListener('click', toggleUI);
}

function inputOnlyDigits(event) {
  event.currentTarget.value = event.currentTarget.value.replace(/\D|(\d{6})(\d+)/, '$1');
}

function sendValue(event) {
  const output = outputsArr.find(({ id }) => id === event.currentTarget.name);
  output.value = event.currentTarget.value;
}

function formVerification() {
  const hasEmptyField = inputsArr.find(({ value }) => value === '');
  submitBtn.disabled = !hasEmptyField ? false : true;
}

for (const input of inputsArr) {
  if (input.name === 'zip') {
    input.addEventListener('input', inputOnlyDigits);
  }
  input.addEventListener('change', sendValue);
  input.addEventListener('input', formVerification);
}

submitBtn.addEventListener('click', event => event.preventDefault());
if (!form.hasAttribute('action')) {
  form.setAttribute('action', 'handler.php');
}