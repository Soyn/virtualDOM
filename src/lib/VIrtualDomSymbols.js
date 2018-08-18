const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const VIRTUAL_DOM_TYPE = hasSymbol
  ? Symbol.for('virtualDom.element')
  : 0x0001;