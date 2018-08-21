import _ from 'lodash';
import { setAttribute } from './utils';
import { moveAction, REMOVE_ELEMENT, INSERT_ELEMENT } from './VIrtualDomSymbols';

function reorderChildren(node, moves) {
  const staticNodeList = _.toArray(node.childNodes);
  const maps = {};

  staticNodeList.forEach(node => {
    if (node.nodeType === 1) {
      const key = node.getAttribute('key');
      if (key) {
        maps[key] = node;
      }
    }
  });

  _.each(moves, (move) => {
    const index = move.index;
    if(move.type === REMOVE_ELEMENT) {
      if(staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
    } else if(move.type === INSERT_ELEMENT) {
      const insertNode = maps[move.item.key]
        ? maps[move.item.key].cloneNode(true)
        : (typeof move.item === 'object')
          ? move.item.render()
          : document.createTextNode(move.item);
      staticNodeList.splice(index, 0, insertNode)
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}

function setProps(node, props) {
  for (let key in props) {
    if(props[key] === void 0) {
      node.removeAttribute(key);
    } else {
      let value = props[key];
      setAttribute(node, key, value);
    }
  }
}
function applyPatches(node, currentPatches) {
  _.each(currentPatches, (patch) => {
    switch(currentPatches.type) {
      case moveAction.REPLACE:
        const newNode = (typeof patch.node === 'string')
          ? document.createTextNode(patch.node)
          : patch.node.render();
        break;
      case moveAction.REORDER:
        reorderChildren(node, patch.moves);
        break;
      case moveAction.PROPS:
        setProps(node, patch.PROPS);
        break;
      case moveAction.TEXT:
        if (node.textContent) {
          node.textContent = patch.content;
        } else {
          node.nodeValue = patch.content;
        }
      default:
        throw new Error('Unknown patch type ' + patch.type);
    }
  })
}
function dfsWalk(node, walker, patches) {
  const currentPatches = patches[walker.index];

  const len = node.childNodes
    ? node.childNodes.length
    : 0;
  for (let i = 0; i < len; i++) {
    const childNode = node.childNodes[i];
    walker.index += 1;
    dfsWalk(childNode, walker, patches);
  }

  if (currentPatches) {
    
  }
}
function patch(node, patches) {
  const walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

export default patch;