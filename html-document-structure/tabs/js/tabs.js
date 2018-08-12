'use strict';
const tabsUI = document.querySelector('#tabs');

function initTabs(container) {
  const nav = container.querySelector('.tabs-nav');
  const tabPattern = nav.removeChild(nav.firstElementChild);
  const content = container.querySelector('.tabs-content');
  const articlesArr = Array.from(content.children);
  
  //создаем табы и прячем содержимое статей:
  articlesArr.forEach(article => {
    const cloneTab = tabPattern.cloneNode(true);
    cloneTab.firstElementChild.textContent = article.dataset.tabTitle;
    cloneTab.firstElementChild.classList.add(article.dataset.tabIcon);
    nav.appendChild(cloneTab);  
    
    article.classList.add('hidden');
  })
  
  function activateTab() {
    const currentTab = nav.querySelector('.ui-tabs-active');
    const currentArticle = articlesArr.find(({ dataset }) => dataset.tabTitle === currentTab.textContent);
    const activatedArticle = articlesArr.find(({ dataset }) => dataset.tabTitle === event.target.textContent);
    
    currentTab.classList.remove('ui-tabs-active');
    currentArticle.classList.add('hidden');
    event.currentTarget.classList.add('ui-tabs-active');
    activatedArticle.classList.remove('hidden');
  }
 
  //находим все табы и добавляем обработчик события:
  const tabs = nav.querySelectorAll('li'); 
  Array.from(tabs).forEach(tab => tab.addEventListener('click', event => activateTab()));
   
  tabs[0].classList.add('ui-tabs-active'); //активируем первый таб
  content.firstElementChild.classList.remove('hidden'); //показываем первую статью
}
  
initTabs(tabsUI);