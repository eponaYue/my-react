import React, { Component } from 'react';
import videojs from 'video.js';
import 'videojs-flash';
import videoSwf from 'videojs-swf/dist/video-js.swf';

import 'video.js/dist/video-js.css';

class Video extends Component {
  instance = null;
  videoNode = null;
  componentDidMount() {
    console.log(videojs);
    this.instance = videojs(
      this.videoNode,
      {
        autoplay: true,
        controls: 'controls',
        bigPlayButton : false,
        height: 472,
        width: 600,
        preload: 'auto',
        techOrder: ['flash', 'html5'],
        sources: [
          {
            src: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc',
            type: 'rtmp/mp4',
          },
        ],
        flash: {
          swf: videoSwf,
        },
      },
    );
    console.log(this.instance);
  }
  componentWillUnmount() {
    this.instance && this.instance.dispose();
  }
  render() {
    return <div>
      <video
        id="video-player"
        ref={node => this.videoNode = node}
        className="video-js vjs-default-skin"
      />
    </div>;
  }
}

export default Video;