'use strict';
const socket = new WebSocket('wss://neto-api.herokuapp.com/mouse');

socket.addEventListener('open', event => showBubbles(event.currentTarget));
window.addEventListener('click', event => socket.send(JSON.stringify( {x: event.clientX, y: event.clientY} )));
