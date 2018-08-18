import _ from 'lodash';
function diffOnNode(oldNode, newNode) {
}
function dfsWalk(oldNode, newNode, index, patches) {
  let actualOldNode = _.isArray(oldNode) ? oldNode[index] : oldNode;
  let actualNewNode = _.isArray(newNode) ? newNode[index] : newNode;
  patches[index] = diffOnNode(actualOldNode, actualNewNode);
  diffChildren(actualOldNode.children, actualNewNode.children, index, patches);
}

function diffChildren(oldChildren, newChildren, index, patches) {
  let leftNode = null;
  let currentNodeIndex = index;
  oldChildren.forEach((child, i) => {
    let newChild = newChildren[i];
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches);
    leftNode = child;
  })
}
/**
 * 
 * @param {object} oldTree 
 * @param {object} newTree 
 */
export function diff(oldTree, newTree) {
  let index = 0;
  const patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}
