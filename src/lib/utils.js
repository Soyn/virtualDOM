export const setAttribute = (node, key, value) => {
  switch(key) {
    case 'style': {
      node.style.cssText = value;
      break;
    }
    case 'value': {
       let tagName = node.tagName || '';
       tagName = tagName.toLowercase();
       const editableTags = ['input', 'textarea'];
       const isEditableNode = editableTags.indexOf(tagName) > -1;
       if(isEditableNode) {
         node.value = value;
       } else {
         node.setAttribute(key, value);
       }
       break;
    }
    default:
      node.setAttribute(key, value);
      break;
  }
}