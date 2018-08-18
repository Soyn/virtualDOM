/**
 * Algorithm to diff two lists in O(n) time. There are two assumption to make it possible
 * More details in https://reactjs.org/docs/reconciliation.html
 * https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js
 */
function diff(oldList, newList, key) {
  const oldMap = makeKeyIndexAndFree(oldList, key);
  const newMap = makeKeyIndexAndFree(newList, key);

  const newFree = newMap.free;

  const oldKeyIndex = oldMap.keyIndex;
  const newKeyIndex = newMap.keyIndex;

  const children = [];
  let item, itemKey;
  let freeIndex = 0;
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
  const remove = (i) => {
    
  }
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