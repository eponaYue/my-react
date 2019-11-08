/**
 * vdom转换为dom
 * diff
 * @param {元素类型，1-html元素、2-function元素、3-class组件} vtype 
 * @param {*} type 
 * @param {*} props 
 */
export function createVNode(vtype, type, props) {
  const vnode = { vtype, type, props };

  return vnode;
}

// vdom转换为dom
export function initVNode(vnode) {
  const { vtype } = vnode;
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode);
  }
  if (vtype === 1) {
    // 原生元素
    return createElement(vnode);
  } else if (vtype === 2) {
    // 类组件
    return createClassComp(vnode);
  } else if (vtype === 3) {
    // 函数组件
    return createFuncComp(vnode);
  }
}

function createElement(vnode) {
  // 根据type创建元素
  const { type, props } = vnode;
  const node = document.createElement(type);

  // 处理属性
  const { key, children, ...rest } = props;
  Object.keys(rest).forEach(k => {
    // 处理特别属性名： classNames、htmlFor
    if (k === 'className') {
      node.setAttribute('class', rest[k]);
    } else if (k === 'htmlFor') {
      node.setAttribute('for', rest[k]);
    } else if (k === 'style' && typeof rest[k] === 'object') {
      // 简单伪码
      const style = Object.keys(rest[k]).map(s => s + ':' + rest[k][s]).join(';');
      node.setAttribute('style', style);
    } else if (k.startsWith('on')) {
      const event = k.toLowerCase();
      node[event] = rest[k];
    } else {
      node.setAttribute(k, rest[k]);
    }
  });
  // 递归子元素
  children.forEach(c => {
    if (Array.isArray(c)) {
      c.forEach(n => node.appendChild(initVNode(n)));
    } else {
      node.appendChild(initVNode(c));
    }
  });
  return node;
}
// class组件转换
function createClassComp(vnode) {
  // type 是class组件的声明
  const { type, props } = vnode;
  const component = new type(props);
  console.log(type, component);
  const vdom = component.render();
  return initVNode(vdom);
}

function createFuncComp(vnode) {
  // type 是函数
  const { type, props } = vnode;
  const vdom = type(props);
  return initVNode(vdom);
}