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

const REPLACE = hasSymbol
  ? Symbol.for('virtualDom.replace')
  : 0x0004;
const REORDER = hasSymbol
  ? Symbol.for('virtualDom.reorder')
  : 0x0005;
const PROPS = hasSymbol
  ? Symbol.for('virtualDom.props')
  : 0x0006;
const TEXT = hasSymbol
  ? Symbol.for('virtualDom.text')
  : 0x0007;

export const moveAction = {
  REPLACE,
  REORDER,
  PROPS,
  TEXT,
};