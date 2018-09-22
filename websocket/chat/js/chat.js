'use strict';
const chat = document.querySelector('.chat');
const msgsOutput = chat.querySelector('.messages-content');
msgsOutput.style = 'overflow: auto;';
const msgsTemplates = chat.querySelector('.messages-templates');
const incomingMsgTemplate = Array.from(msgsTemplates.querySelectorAll('.message')).find(msg => msg.classList.length === 1);
const status = chat.querySelector('.chat-status');
const form = chat.querySelector('.message-box');
const submit = form.querySelector('button.message-submit');
const input = form.querySelector('input.message-input');
submit.addEventListener('click', event => sendMsg());
input.addEventListener('keydown', event => sendMsg());

const wssURL = 'wss://neto-api.herokuapp.com/chat';
const socket = new WebSocket(wssURL);
socket.addEventListener('open', event => toggleSessionStatus());
socket.addEventListener('message', event => getIncomingMsg());
socket.addEventListener('close', event => toggleSessionStatus());
window.addEventListener('beforeunload', event => socket.close(1000, 'Chat session status is ending.'));
socket.addEventListener('error', error => console.log(`Произошла ошибка: ${error.data}`));

function toggleSessionStatus() {
  const online = status.dataset.online;
  const offline = status.dataset.offline;
  status.textContent = (status.textContent === offline) ? online : offline;
  form.querySelector('button.message-submit').disabled = form.querySelector('button.message-submit').disabled ? false : true;
  displayMsg('.message-status', `Пользователь ${(status.textContent === online) ? 'появился' : 'не'} в сети`);
}

function sendMsg() {
  if (event.type === 'click' || event.keyCode === 13) {
    event.preventDefault();
    const personalMsg = input.value;
    socket.send(JSON.stringify(personalMsg));
    displayMsg('.message-personal', input.value);
    input.value = '';
  }
}

function getIncomingMsg() {
  if (event.data) {
    switch (event.data) {
        case '...':
        displayMsg('.loading');
        break;
        
        default:
        const loadingMsg = msgsOutput.querySelector('.loading');
        displayMsg('', event.data);
        if (loadingMsg) {
          msgsOutput.removeChild(loadingMsg);
        }
    }
  }
}

function displayMsg(msgClassName, msgText) {
  const template = (msgClassName !== '') ? msgsTemplates.querySelector(`.message${msgClassName}`) : incomingMsgTemplate;
  const msg = template.cloneNode(true);
  if (msgClassName === '' || msgClassName === '.message-personal') {
    const timestamp = new Date().toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
    msg.querySelector('.timestamp').textContent = timestamp;
  } else if (msgClassName === '.loading') {
    msgsOutput.append(msg); 
    return ;
  }
  msg.querySelector('.message-text').textContent = msgText;
  msgsOutput.append(msg);  
}
