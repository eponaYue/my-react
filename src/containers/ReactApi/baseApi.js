import { createVNode } from './vdom';

function createElement(type, props, ...children) {
  // console.log(arguments);
  props.children = children;
  delete props.__source;
  delete props.__self;
  // vtype: 组件类型
  let vtype;
  if (typeof type === 'string') {
    // 原生标签
    vtype = 1;
  } else if (typeof type === 'function') {
    if (type.isClassComponent) {
      // 类组件
      vtype = 2;
    } else {
      // 函数组件
      vtype = 3;
    }
  }
  return createVNode(vtype, type, props);
}

export default { createElement };

export class Component {
  // 区分某个class是类还是function
  static isClassComponent = true;

  constructor(props) {
    this.props = props;
    this.state = {};
  }
  setState() {

  }
}