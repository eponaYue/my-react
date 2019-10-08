import React, { Component } from 'react';
import { Tabs } from 'antd';
import VideoVXG from './VXG';
import Video from './VIDEO';
import JWVideo from './JW';
import VideoVLC from './VLC';

import './index.less';

const TabPane = Tabs.TabPane;
class VideoRTM extends Component {
  state = {
    tabKey: '4', // 1-videoVXG;2-video.js;3-jwp;
  };
  changeTab = (tabKey) => {
    this.setState({ tabKey });
  }
  render() {
    return <Tabs activeKey={this.state.tabKey} onChange={this.changeTab}>
      <TabPane tab="VXG" key="1"><VideoVXG /></TabPane>
      <TabPane tab="VIDEO.JS" key="2"><Video /></TabPane>
      <TabPane tab="JWP" key="3"><JWVideo /></TabPane>
      <TabPane tab="VLC" key="4"><VideoVLC /></TabPane>
    </Tabs>;
  }
}

export default VideoRTM;