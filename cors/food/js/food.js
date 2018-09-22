'use strict';
const jsonpRecieptURL = 'https://neto-api.herokuapp.com/food/42';
const jsonpRatingURL = 'https://neto-api.herokuapp.com/food/42/rating';
const jsonpConsumersURL = 'https://neto-api.herokuapp.com/food/42/consumers';
const container = document.querySelector('.wrapper');
const datasetNames = ['pic', 'title', 'ingredients', 'rating', 'star', 'votes', 'consumers'];
const tagsWithDataset = {};
datasetNames.forEach(name => tagsWithDataset[name] = container.querySelector(`[data-${name}]`));

function initFoodCard([rec, rating, users]) {
  tagsWithDataset.pic.style = `background: url(${rec.pic});`; 
  tagsWithDataset.title.textContent = rec.title;
  tagsWithDataset.ingredients.textContent = `${rec.ingredients.join(', ')}.`;
  tagsWithDataset.rating.textContent = rating.rating.toPrecision(3);
  tagsWithDataset.star.style = `width: ${rating.rating * 10}%;`; 
  tagsWithDataset.votes.textContent = `(${rating.votes} оценок)`;
  
  function addDisplayedUsers(user) {
    const img = document.createElement('img');
    img.src = user.pic;
    img.title = user.name;
    tagsWithDataset.consumers.appendChild(img);
  }
  
  function showHiddenAmnt() {
    const hiddenUsers = document.createElement('span');
    hiddenUsers.textContent = `(+${users.total})`;
    hiddenUsers.style = 'margin-left: 5px;';
    tagsWithDataset.consumers.appendChild(hiddenUsers);
  }
  
  users.consumers.forEach(addDisplayedUsers);
  showHiddenAmnt();
}

function loadData(url) {
  const cbName = 'cb' + String(Math.random()).slice(-5);
  return new Promise((done, fail) => {
    window[cbName] = done;
    
    const script = document.createElement('script');
    script.src = `${url}?callback=${cbName}`;
    document.body.appendChild(script);
    document.body.removeChild(script);
  });
}

Promise.all([
  loadData(jsonpRecieptURL),
  loadData(jsonpRatingURL),
  loadData(jsonpConsumersURL)
])
.then(initFoodCard);
