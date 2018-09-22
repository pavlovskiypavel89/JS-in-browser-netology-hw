'use strict';
const jsonpProfileURL = 'https://neto-api.herokuapp.com/profile/me';
const jsonpTechesURLPattern = 'https://neto-api.herokuapp.com/profile/:id/technologies';
const content = document.querySelector('.content');
const datasetNames = ['name', 'description', 'pic', 'position', 'technologies'];
const tagsWithDataset = {};
datasetNames.forEach(name => tagsWithDataset[name] = content.querySelector(`[data-${name}]`));

function parseTeches(technologies) {
  function addTechSnippet(tech) {
    const techSnippet = document.createElement('span');
    techSnippet.classList.add('devicons', `devicons-${tech}`);
    tagsWithDataset.technologies.appendChild(techSnippet);
  }
  
  technologies.forEach(addTechSnippet);
}

function parseProfile(user) {
  tagsWithDataset.name.textContent = user['name'];
  tagsWithDataset.description.textContent = user['description'];
  tagsWithDataset.position.textContent = user['position'];
  tagsWithDataset.pic.src = user['pic'];
  return user.id;
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

function initProfile(profileURL) {
  loadData(profileURL)
    .then(parseProfile)
    .then(profileID => loadData(jsonpTechesURLPattern.replace(':id', profileID)))
    .then(parseTeches)
    .then(() => content.style='display: initial;');
}

initProfile(jsonpProfileURL);
