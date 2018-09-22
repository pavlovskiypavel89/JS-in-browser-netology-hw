'use strict';
const jsonpURL = 'https://neto-api.herokuapp.com/twitter/jsonp';
const container = document.querySelector('.container');
const datasetNames = ['wallpaper', 'username', 'description', 'pic', 'tweets', 'followers', 'following'];
const tagsWithDataset = {};
datasetNames.forEach(name => tagsWithDataset[name] = container.querySelector(`[data-${name}]`));

function parseData(obj) {
  for (const key in obj) {
    (key === 'pic' || key === 'wallpaper') ? (tagsWithDataset[key].src = obj[key]) : (tagsWithDataset[key].textContent = obj[key]);
  }
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

loadData(jsonpURL).then(parseData); 
