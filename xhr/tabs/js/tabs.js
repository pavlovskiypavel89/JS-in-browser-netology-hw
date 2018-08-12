'use strict';
function initTabs() {
  const tabs = Array.from(document.querySelectorAll('.tabs > nav > a'));
  const content = document.getElementById('content');
  const preloader = document.getElementById('preloader');
  function loadTabContent(tab) {
    const contentReqst = new XMLHttpRequest();
    contentReqst.addEventListener('loadstart', preloaderToggle);
    contentReqst.addEventListener('load', onLoad);
    contentReqst.addEventListener('error', onError);
    contentReqst.addEventListener('loadend', preloaderToggle);
    contentReqst.open('GET', tab.href);
    contentReqst.send();
          
    function preloaderToggle() {
      preloader.classList.toggle('hidden');
    }

    function onLoad(event) {
      if (event.currentTarget.status === 200) {
        content.innerHTML = event.currentTarget.responseText;
      } else {
        console.log(`���������� ���������� ������ ��������.\n������ ${event.currentTarget.status}: ${event.currentTarget.statusText}.`)
      }
    }

    function onError() {
      console.log(`���������� ���������� ������ ��������.\n������ ����.`)
    }
  }
  
  for (const tab of tabs) {  
    if (tab.textContent === 'Email') {
      loadTabContent(tab);
    }
    tab.addEventListener('click', event => {
      event.preventDefault();
      if (!event.currentTarget.classList.contains('active')) {
        tabs.forEach(tab => tab.classList.toggle('active'));
        loadTabContent(event.currentTarget);
        //content.innerHTML = ''; //��������, ���� �� ����� �������� ���� ������ ���� ����� ������ preloader.
      } else {
        return ;
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', initTabs);