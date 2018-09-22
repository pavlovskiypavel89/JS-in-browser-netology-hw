'use srict';
const counter = document.querySelector('.counter');
const errsOutput = document.querySelector('output.errors');
const wssURL = 'wss://neto-api.herokuapp.com/counter';
const socket = new WebSocket(wssURL);

socket.addEventListener('message', event => outputData());
window.addEventListener('beforeunload', event => socket.close(1000));

function outputData() {
  const data = JSON.parse(event.data);
  counter.textContent = data.connections;
  errsOutput.textContent = data.errors;
}
