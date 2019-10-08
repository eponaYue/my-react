import React, { Component } from 'react';
// import './index.less';

class VideoVLC extends Component {
  videoContainer: HTMLDivElement | null;
  isIE = window.ActiveXObject || 'ActiveXObject' in window;
  state = {};
  static defaultProps = {
    width: 600,
    height: 250,
    url: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
    id: 'vxg_media_player1',
  };
  componentDidMount() {
    const { width, height } = this.props;
    const style = this.setStyle(width, height);
    this.isIE && this.inIE(style, this.props);
    !this.isIE && this.inChrome(style, this.props);

  }
  setStyle = (width: number | string, height: number | string) => {
    let style = '';
    if (typeof width === 'number') {
      style += `width: ${width}px; `
    } else {
      style += `width: ${width}; `
    }
    if (typeof height === 'number') {
      style += `height: ${height}px;`;
    } else {
      style += `height: ${height};`;
    }
    return style;
  };
  inIE = (style, props) => {
    if (this.videoContainer) {
      const { width, height, url, id } = props;
      // const embed = `
      // <div>请点击<a href="http://lvzhoudiskh3c.blob.core.chinacloudapi.cn/camera/ie-plugin.zip">下载vlc插件</a></div>
      // <embed
      // type="application/x-vlc-plugin"
      // pluginspage="http://www.videolan.org"
      // src="${url}"
      // target="${url}"
      // id="${id}"
      // width="${width}"
      // height="${height}"
      // />
      // `;
      const embed = ` <object type='application/x-vlc-plugin' id='vlc' events='True'
 
      classid='clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921' codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab" width="720" height="540">

         <param name='mrl' value='${url}' />

         <param name='volume' value='50' />

         <param name='autoplay' value='true' />

         <param name='loop' value='false' />

         <param name='fullscreen' value='false' />

   </object>`
      // const bg = `<div style="${style}; background-color: black;" />`;
      this.videoContainer.innerHTML = embed;
    }
  }
  inChrome = (style, props) => {
    if (this.videoContainer) {
      const { width, height, url, id } = props;
      this.videoContainer.innerHTML = `
      <object type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="720" height="410">
    <param name='mrl' value='${url}' />
    <param name='volume' value='50' />
    <param name='autoplay' value='true' />
    <param name='loop' value='false' />
    <param name='fullscreen' value='false' />
    <param name='controls' value='false' />
</object>`;
      // this.videoContainer.innerHTML = `
      // <div
      // id="${id}"
      // url="${url}"
      // nmf-src=${player}
      // nmf-path="media_player.nmf"
      // useragent-prefix="MMP/3.0"
      // latency="10000"
      // autohide="2"
      // volume="0.7"
      // avsync
      // controls
      // mute
      // aspect-ratio
      // aspect-ratio-mode="1"
      // auto-reconnect
      // connection-timeout="5000"
      // connection-udp="0"
      // custom-digital-zoom
      // style="${style}"
      // class="vxg-player"
      // />`;
      // const { players } = window.vxgplayer;
      // if (players && players[id]) {
      //   clearTimeout(players[id].reconnecting);
      //   players[id].dispose();
      // }
      // window.vxgplayer(id, { width, height });
    }
  }
  render() {
    return <div id="vcl-container" ref={rn => { this.videoContainer = rn }} />;
  }
}

export default VideoVLC;