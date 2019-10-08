import React, { Component } from 'react';
import ReactJWPlayer from 'react-jw-player';
import './index.less';

class JWVideo extends Component {
  domNode;
  instance;
  componentDidMount() {
    window.jwplayer(this.domNode).setup({
      file: "rtmp://202.69.69.180:443/webcast/bshdlive-pc",
      // "image": "http://example.com/myImage.png",
      height: 472,
      width: 600,
    });
  }
  render() {
    return <div
      className="jw-video-contianer"
      ref={node => this.domNode = node}
    />;
  }
}

export default JWVideo;