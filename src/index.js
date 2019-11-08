// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
// import App from './containers/App/App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// serviceWorker.unregister();

/*************************************************** */
import React, { Component } from './containers/ReactApi/baseApi';
import ReactDom from './containers/ReactApi/react-dom';

function Comp(props) {
  return <h2>hello, {props.name}</h2>;
}

class Comp2 extends Component {
  render() {
    return (
      <div>
        <h2>hello, {this.props.name}</h2>
      </div>
    );
  }
}

const users = [
  { name: 'epona', age: 17 },
  { name: 'birdy', age: 23 },
];

const Vdom = (
  <div id="func-dom" key='react-key' onClick={() => alert('react click')} style={{ color: 'red' }}>
    <span>hello, react core api</span>
    <Comp name="函数组件" />
    <Comp2 name="类组件" />
    <ul>
      {users.map(user => <li key={user.name}>{user.name}</li>)}
    </ul>
  </div>
);

console.log(Vdom);

ReactDom.render(Vdom, document.querySelector("#root"))
/*************************************************** */

