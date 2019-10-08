import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import SiderMenu from '../../components/Menu';
import Bdnet from '../Map/Bdnet';
import Gdnet from '../Map/Gdnet';
import { FormIn } from '../DataInput';
import { VideoRTM } from '../RTM';
import './App.less';

const { Header, Content, Footer } = Layout;
const routerData = [
  { path: '/map/netBD', component: Bdnet },
  { path: '/map/netGD', component: Gdnet },
  { path: '/dataInput/formIn', component: FormIn },
  { path: '/RTM/rtm-video', component: VideoRTM },
];

function getRouterConfig() {
  return routerData.map(item => <Route path={item.path} component={item.component} key={item.path} />);
}

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <SiderMenu />
          <Layout style={{ marginLeft: 200, height: '100vh' }}>
            <Header>it is header</Header>
            <Content>
              <Route path="/" exact component={Bdnet} />
              {getRouterConfig()}
            </Content>
            <Footer>it is Footer</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
