'use strict';
const acSelect = document.getElementById('acSelect'),
      btnSeatMap = document.getElementById('btnSeatMap'),
      btnSetFull = document.getElementById('btnSetFull'),
      btnSetEmpty = document.getElementById('btnSetEmpty'),
      title = document.getElementById('seatMapTitle'),
      scheme = document.getElementById('seatMapDiv'),
      totalPax = document.getElementById('totalPax'),
      totalAdult = document.getElementById('totalAdult'),
      totalHalf = document.getElementById('totalHalf'),
      crntAirbus = {};

function getData(id) {
  fetch(`https://neto-api.herokuapp.com/plane/${id}`)
  .then((resp) => {
    if (200 <= resp.status && resp.status < 300) {
      return resp.json();
    }
      throw new Error(resp.statusText);
  })
  .then(data => {
    title.textContent = `${data.title} (${data.passengers} пассажиров)`;
    Object.keys(data).forEach(key => crntAirbus[key] = data[key]);
  })
  .catch(err => console.error(`${err}`));
}

function el(name, attrs, childs) {
  const element = document.createElement(name || 'div');
  
  if (typeof attrs === 'object' && attrs) {
    Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
  }
  if (Array.isArray(childs)) {
    element.appendChild(
      childs.reduce((f, child) => {
        f.appendChild(child);
        return f;
      }, document.createDocumentFragment())
    );
  } else if (typeof childs === 'string' || typeof childs === 'number') {
    element.appendChild(document.createTextNode(childs));
  } 
  
  return element;
}

function showScheme() {
  event.preventDefault();
  event.currentTarget.blur();
  while (scheme.hasChildNodes()) {
    scheme.removeChild(scheme.lastChild);
  }
  
  function crtNum(num) {
    return el('div', { class: 'col-xs-1 row-number' }, [ el('h2', null, num + 1) ]);
  }

  function crtSeat(name) {
    const seat = name ? [el('span', { class: 'seat-label' }, name)] : null;
    return el('div', { class: `col-xs-4 ${name ? '' : 'no-'}seat` }, seat);
  }
  
  function crtSides(seats) {
    const [left, right] = seats;
    return [
      el('div', { class: 'col-xs-5' }, left),
      el('div', { class: 'col-xs-5' }, right)
    ];
  }
    
  function crtRows() {
    return crntAirbus.scheme.reduce((scheme, seatsAmnt, row) => {
      const reg = new RegExp(`[^${crntAirbus.letters4.join(',')}]`, 'g');
      crntAirbus.letters4 = crntAirbus.letters6.join(',').replace(reg, '').split(',');
      let seats;
        
      if (seatsAmnt) {
        seats = crntAirbus[`letters${seatsAmnt}`].reduce((group, letter, num) => {
          const sideLength = crntAirbus[`letters${seatsAmnt}`].length / 3;
          const isLeft = (num <= sideLength);
          group[isLeft ? 0 : 1].push(crtSeat(letter)); 
          return group;
        }, [[], []]);        
      } else {
        seats = [];
      }
      
      scheme.appendChild( el('div', { class: 'row seating-row text-center' }, [crtNum(row), ...crtSides(seats)]) );
      return scheme;
    }, document.createDocumentFragment());                             
  }
  
  scheme.appendChild(crtRows());
  showInfo();
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
} 

function showInfo() {
  totalAdult.textContent = scheme.querySelectorAll('div.seat.adult').length;
  totalHalf.textContent = scheme.querySelectorAll('div.seat.half').length;
  totalPax.textContent = Number(totalAdult.textContent) + Number(totalHalf.textContent);
}

function setSeats(act) {
  event.preventDefault();
  event.currentTarget.blur();
  scheme.querySelectorAll('div.seat').forEach(seat => {
    switch (act) {
      case 'add':
      seat.classList.remove('half');
      seat.classList.add('adult');
      break;
      
      case 'remove':
      seat.classList.remove('adult', 'half');  
    }
  });
  showInfo();
} 

function chkSeat() {
  if (event.target.classList.contains('seat') || event.target.classList.contains('seat-label')) {
    const el = event.target.classList.contains('seat') ? event.target : event.target.parentElement;
    el.classList.toggle('adult', !(el.classList.contains('adult') || el.classList.contains('half') || event.altKey));
    el.classList.toggle('half', !(el.classList.contains('half') || el.classList.contains('adult') || !event.altKey));
  }
  showInfo();
}

btnSeatMap.addEventListener('click', event => showScheme());
btnSetFull.addEventListener('click', event => setSeats('add'));
btnSetEmpty.addEventListener('click', event => setSeats('remove'));
scheme.addEventListener('click', event => chkSeat());
acSelect.addEventListener('change', event => {
  getData(event.currentTarget.value);
  event.currentTarget.blur();
});
document.addEventListener('DOMContentLoaded', event => {
  getData(acSelect.value);
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
});
