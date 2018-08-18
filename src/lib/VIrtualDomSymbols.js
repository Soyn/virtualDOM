const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const VIRTUAL_DOM_TYPE = hasSymbol
  ? Symbol.for('virtualDom.element')
  : 0x0001;
export const REMOVE_ELEMENT = hasSymbol
  ? Symbol.for('virtualDom.remove')
  : 0x0002;
export const INSERT_ELEMENT = hasSymbol
  ? Symbol.for('virtualDom.insert')
  : 0x0003;