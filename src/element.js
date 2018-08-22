import _ from 'lodash';
import { setAttribute } from './lib/utils';
import { VIRTUAL_DOM_TYPE } from './lib/VirtualDomSymbols';
class Element {
  constructor(tagName, props, children) {
    if (!_.isArray(children) && children != null) {
      children = _.slice(arguments, 2).filter(child => !!child);
    }

    if(_.isArray(props)) {
      children = props;
      props = {}
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : void 0;
    this.$$type = VIRTUAL_DOM_TYPE;

    let count = 0;
    _.each(this.children, (child, i) => {
      if (child instanceof Element) {
        count += child.count;
      } else {
        children[i] = '' + child;
      }
      count++;
    });
    this.count = count;
  }
  render() {
    const el = document.createElement(this.tagName);
    const props = this.props;
    for(var propName in props) {
      if(props.hasOwnProperty(propName)) {
        setAttribute(el, propName, props[propName]);
      }
    }
    _.each(this.children, (child) => {
      const childElement = (child instanceof Element) ?
        child.render() : document.createTextNode(child);
      el.appendChild(childElement);
    });

    return el;
  }
}

export function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}
/**
 * 
 * @param {?object} object
 * @return {boolean} True if 'object' is a valid component 
 */
export function isValidElement(object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$type === VIRTUAL_DOM_TYPE
  );
}