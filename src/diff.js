import _ from 'lodash';
import { moveAction } from './lib/VIrtualDomSymbols';
import listDiff from './lib/listDiff';
function diffOnNode(oldNode, newNode) {
}
function diffProps(oldNode, newNode) {
  let count = 0;
  const oldProps = oldNode.props;
  const newProps = newNode.props;
  const propsPatches = { };

  // get diff props out
  for(let key in oldProps) {
    const value = oldProps[key];
    if (newProps.hasOwnProperty(key) && newProps[key] !== value) {
      count += 1;
      propsPatches[key] = newProps[key];
    }
  }

  // get the new props
  for (let key in newProps) {
    const value = newProps[key];
    if (!oldProps.hasOwnProperty(key)) {
      count += 1;
      propsPatches[key] = newProps[key];
    }
  }
  if (count === 0) {
    return null;
  }
  return propsPatches;
}
function dfsWalk(oldNode, newNode, index, patches) {
  let actualOldNode = _.isArray(oldNode) ? oldNode[index] : oldNode;
  let actualNewNode = _.isArray(newNode) ? newNode[index] : newNode;
  const currentPatch = [];

  if(actualNewNode === null) {
    // do nothing
  } else if(_.isString(actualOldNode) && _.isString(actualOldNode)) {
    if(actualNewNode !== actualOldNode) {
      currentPatch.push({
        type: moveAction.TEXT,
        content: newNode
      });
    } else {
      const propsPathch = diffProps(actualOldNode, actualNewNode);
    }
  }
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
