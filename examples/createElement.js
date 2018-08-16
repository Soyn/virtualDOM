import vd from '../src';

const ul = vd.createElement('ul', { id: 'list-container'}, 
  [vd.createElement('li', { class: 'item'}, ['item 1']),
  vd.createElement('li', { class: 'item'}, ['item 2']),
  vd.createElement('li', { class: 'item'}, ['item 3']),]
);
const rootNode = document.getElementById('root');
rootNode.appendChild(ul.render());