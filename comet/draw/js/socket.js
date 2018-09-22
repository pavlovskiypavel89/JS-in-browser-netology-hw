'use strict';
const socket = new WebSocket('wss://neto-api.herokuapp.com/draw');
socket.addEventListener('open', () => {
  window.editor.addEventListener('update', (event) => event.canvas.toBlob(
    blob => socket.send(blob), 'image/webp', 0.9)
  );
});

socket.addEventListener('close', event => console.log(event.wasClean ? 'There was a clean closing' : `There was a disconnect. Reason: ${event.reason}`));
window.addEventListener('beforeunload', () => socket.close(1000, 'Session normally closed'));
socket.addEventListener('error', error => console.log(`Error: ${error.message}`));
