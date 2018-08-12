'use strict';
const todoList = document.querySelector('.todo-list');
const doneList = todoList.querySelector('.done');
const undoneList = todoList.querySelector('.undone');

for (const list of [doneList, undoneList]) {
  const listItems = list.querySelectorAll('label');
  Array.from(listItems).forEach(item => item.addEventListener('change', event => {
    if (event.target.checked) {
      doneList.appendChild(event.target.parentElement);
    } else {
      undoneList.appendChild(event.target.parentElement);
    }
  }));
}