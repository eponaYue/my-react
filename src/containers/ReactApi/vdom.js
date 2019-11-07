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