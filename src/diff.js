import _ from 'lodash';
import { moveAction } from './lib/VirtualDomSymbols';
import listDiff from './lib/listDiff';
function diffProps(oldNode, newNode) {
  let count = 0;
  const oldProps = oldNode.props;
  const newProps = newNode.props;
  const propsPatches = {};

  // get diff props out
  for (let key in oldProps) {
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
      propsPatches[key] = value;
    }
  }
  if (count === 0) {
    return null;
  }
  return propsPatches;
}
function isIgnoreChildren(node) {
  return (node.props && node.props.hasOwnProperty('ignore'));
}
function dfsWalk(oldNode, newNode, index, patches) {
  let actualOldNode = _.isArray(oldNode) ? oldNode[index] : oldNode;
  let actualNewNode = _.isArray(newNode) ? newNode[index] : newNode;
  const currentPatch = [];

  if (actualNewNode === null) {
    // do nothing
  } else if (_.isString(actualOldNode) && _.isString(actualNewNode)) {
    if (actualNewNode !== actualOldNode) {
      currentPatch.push({
        type: moveAction.TEXT,
        content: newNode
      });
    } else if (
      actualNewNode.tagName === actualOldNode.tagName &&
      actualNewNode.key === actualOldNode.key
    ) {
      const propsPatch = diffProps(actualOldNode, actualNewNode);
      if (propsPatch) {
        currentPatch.push({
          type: moveAction.PROPS,
          content: newNode
        });
      }
      if (!isIgnoreChildren(newNode)) {
        diffChildren(
          actualOldNode.children,
          actualNewNode.children,
          index,
          patches,
          currentPatch
        )
      }
    } else {
      currentPatch.push({
        type: moveAction.REPLACE,
        node: newNode,
      })
    }
    if (currentPatch.length) {
      patches[index] = currentPatch;
    }
  }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  let diffs = listDiff(oldChildren, newChildren, 'key');
  newChildren = diffs.children;
  if (diffs.moves.length) {
    const reorderPatch = {
      type: moveAction.REORDER,
      moves: diffs.moves,
    };
    currentPatch.push(reorderPatch);
  }

  let leftNode = null;
  let currentNodeIndex = index;

  _.each(oldChildren, (child, i) => {
    const newChild = newChildren[i];
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

export default diff;