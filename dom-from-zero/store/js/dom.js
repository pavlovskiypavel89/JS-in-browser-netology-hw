'use strict';
function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  
  const el = document.createElement(node.name || 'div');
  if (node.props && typeof node.props === 'object') {
    Object.keys(node.props).forEach(key => el.setAttribute(key, node.props[key]));
  }
  if (Array.isArray(node.childs)) {
    el.appendChild(node.childs.reduce((fragment, child) => {
        fragment.appendChild(createElement(child));
        return fragment;
      }, document.createDocumentFragment())
    );
  } else if ((typeof node.childs === 'string') || (typeof node.childs === 'number')) {
    el.appendChild(document.createTextNode(node.childs)); 
  }
         
  return el;
}
