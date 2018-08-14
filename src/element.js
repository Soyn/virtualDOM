class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

export default createElement;