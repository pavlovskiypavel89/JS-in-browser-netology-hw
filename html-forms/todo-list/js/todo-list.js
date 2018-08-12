'use strict';
const listBlock = document.querySelector('.list-block');
const checkboxes = listBlock.querySelectorAll('li > input');
const output = listBlock.querySelector('output');
const tasksTotal = checkboxes.length;
let doneTasks = 0;

function checked(event) {
  event.currentTarget.checked ? (doneTasks++) : (doneTasks--);
  if (doneTasks === tasksTotal) {
    listBlock.classList.add('complete'); 
  } else {
    listBlock.classList.remove('complete');
  }
  output.value = output.value.replace(/\d+/, doneTasks);
}

for (const checkbox of checkboxes) {
  checkbox.checked ? (doneTasks++) : '';
  checkbox.addEventListener('change', checked);
}
output.value = `${doneTasks} из ${tasksTotal}`;