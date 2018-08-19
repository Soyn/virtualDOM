/**
 * Algorithm to diff two lists in O(n) time. There are two assumption to make it possible
 * More details in https://reactjs.org/docs/reconciliation.html
 * https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js
 */
import { REMOVE_ELEMENT, INSERT_ELEMENT} from './VIrtualDomSymbols'
function diff(oldList, newList, key) {
  const oldMap = makeKeyIndexAndFree(oldList, key);
  const newMap = makeKeyIndexAndFree(newList, key);

  const newFree = newMap.free;

  const oldKeyIndex = oldMap.keyIndex;
  const newKeyIndex = newMap.keyIndex;

  const children = [];
  let item, itemKey;
  let freeIndex = 0;

  // get the common item between `newlist` and `oldlist`
  for (let i = 0; i < oldList.length; i++) {
    item = oldList[i];
    itemKey = getItemKey(item, key);
    if (itemKey) {
      if (newKeyIndex.hasOwnProperty(itemKey)) {
        const newItemIndex = newKeyIndex[itemKey];
        children.push(newList[newItemIndex]);
      } else {
        children.push(null);
      }
    } else {
      const freeItem = newFree[freeIndex++];
      children.push(freeItem);
    }
  }
  const moves = [];
  const simulateList = children.slice(0);
  for(let i = 0; i < simulateList.length; i++) {
    if(simulateList[i] === null) {
      remove(i);
      removeSimulate(i);
    }
  }
  let i = j = 0;
  for (i = 0; i < newList.length; i++) {
    item = newList[i];
    itemKey = getItemKey(item, key);

    const simulateItem = simulateList[j];
    const simulateItemKey = getItemKey(simulateItem, key);

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        // insert new element
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          const nextItemKey = getItemKey(simulateList[j + 1], key);
          if(nextItemKey === itemKey) {
            remove(i);
            removeSimulate(j);
            j++;
          } else {
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }
  }

  let k = simulateList.length - j;
  while (j < simulateList.length) {
    k--;
    remove(k + i);
    j++;
  }
  const remove = (index) => {
    const move = {index: index, type: REMOVE_ELEMENT };
    moves.push(move);
  }
  const insert = (index, item) => {
    const move = { index, item, type: INSERT_ELEMENT };
    moves.push(move);
  }
  const removeSimulate = (index) => {
    simulateList.splice(index, 1);
  }
  return {
    moves,
    children
  };
}
function makeKeyIndexAndFree(list, key) {
  const keyIndex = {};
  const free = [];
  for(let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const itemKey = getItemKey(item, key);
    if(itemKey) {
      keyIndex[itemKey] = i;
    } else {
      free.push(item);
    }
  }
  return (
    {
      ketIndex,
      free,
    }
  );
}

function getItemKey(item, key) {
  if (!item || !key) {
    return void 0;
  }
  return (
    typeof key === string
      ? item[key]
      : key[item]
  );
}