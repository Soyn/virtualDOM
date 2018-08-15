import _ from 'lodash';
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
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

export default createElement;