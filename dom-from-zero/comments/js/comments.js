'use strict';
function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  commentsContainer.appendChild(
    crtBlock(list.map(crtPattern))
  );
}

function crtPattern(comment) {
  const txtBlock = comment.text.split(/\n/).map(el => {
    const span = { tag: 'span', content: [el, { tag: 'br' }] };  //el = el ? { content: el } : { tag: 'br' };
    return span;
  });
 
  return { tag: 'div',
           cls: 'comment-wrap',
           content: [
            { tag: 'div',
              cls: 'photo',
              attrs: { title: `${comment.author.name}` },
              content: { tag: 'div', cls: 'avatar', attrs: { style: `background-image: url('${comment.author.pic}')` } }
            },
            { tag: 'div',
              cls: 'comment-block',
              content: [
                { tag: 'p',
                  cls: 'comment-text',
                  content: txtBlock
                },
                { tag: 'div',
                  cls: 'bottom-comment',
                  content: [
                    { tag: 'div', cls: 'comment-date', content: `${new Date(comment.date).toLocaleString('ru-Ru')}` },
                    { tag: 'ul', 
                      cls: 'comment-actions',
                      content: [
                        { tag: 'li', cls: 'complain', content: 'Пожаловаться' }, 
                        { tag: 'li', cls: 'reply', content: 'Ответить' }
                      ]
                    }
                  ]
                }
              ]
            }
           ]
         };
}

function crtBlock(block) {
  if ((block === undefined) || (block === null)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block ===  'number')) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    return block.reduce(function(fragment, item) {
      fragment.appendChild(crtBlock(item));
      return fragment;
    }, document.createDocumentFragment());  
  }
  
  const el = document.createElement(block.tag || 'div');
  
  if (block.cls) {
    el.classList.add(...[].concat(block.cls));
  }
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => el.setAttribute(key, block.attrs[key]));
  }
  if (block.content) {
    el.appendChild(crtBlock(block.content));
  }
  
  return el; 
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
