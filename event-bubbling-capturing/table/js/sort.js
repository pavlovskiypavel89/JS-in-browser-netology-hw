function handleTableClick(event) {
  const propName = event.target.dataset.propName;
  if (event.target.tagName === 'TH' && propName) {
    let sortValue = event.target.dataset.dir;
    sortValue = event.target.dataset.dir = !sortValue ? 1 : sortValue *= -1;
    event.currentTarget.dataset.sortBy = propName;
    sortTable(propName, sortValue);
  }
}

/********************************
 * Не менять код ниже           *
 ********************************/

const table = document.querySelector('table');
table.addEventListener('click', handleTableClick);
