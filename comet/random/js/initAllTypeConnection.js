'use strict';
function initConnectionReqst(type) {
  function showRand(num, cls) {
      console.log(`Type: ${cls}, value: ${num}`);
      document.querySelector(`.${cls} > .flip-it`) ? document.querySelector(`.${cls} > .flip-it`).classList.remove('flip-it') : '';
      Array.from(document.querySelectorAll(`.${cls} > div`)).find(el => el.textContent === num).classList.add('flip-it');
  } 
  
  if (type === 'websocket') {
    const socket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
    socket.addEventListener('message', event => showRand(event.data, type));
    socket.addEventListener('close', event => console.log(event.wasClean ? 'There was a clean closing' : `There was a disconnect. Reason: ${event.reason}`));
    window.addEventListener('beforeunload', () => socket.close(1000, 'Session normally closed'));
    socket.addEventListener('error', error => console.log(`Error: ${error.message}`));
  } else {
    fetch('https://neto-api.herokuapp.com/comet/'+ type)
    .then(resp => {
      if (200 <= resp.status && resp.status < 300) {
        if (type === 'long-pooling') { initConnectionReqst(type); }
        return resp.json();
      } else {
        throw new Error(`${resp.statusText}`);
      }
    })
    .then(data => showRand(String(data).replace(/\s/g, ''), type))
    .catch(err => console.error(`${err}`));   
  }
}

document.addEventListener('DOMContentLoaded', () => ['pooling', 'long-pooling', 'websocket'].forEach(type => {
    if (type === 'pooling') {
      setInterval(initConnectionReqst, 5000, type);
    } else {
      initConnectionReqst(type);
    }
  })
);
