import React, { Component } from 'react';

import { mapStyle } from './mapStyle';
import './index.less';

const { BMap } = window;
const polyline = [[116.399, 39.910,], [116.405, 39.920]];

class Bdnet extends Component {
  mapInstance;
  componentDidMount() {
    this.mapInstance = new BMap.Map('BdnetContainer');
    let point = new BMap.Point(116.404, 39.915);
    // this.mapInstance.centerAndZoom(point, 15);
    this.setCenterPointAndZoom(this.mapInstance, point, 15);
    this.mapInstance.enableScrollWheelZoom(true); //允许鼠标滚动缩放
    this.mapInstance.setMapStyle({ styleJson: mapStyle }); //设置地图样式
    this.setMarker(this.mapInstance, point, true);
    this.setPolyline(this.mapInstance, polyline);
  }

  // 设置中心位置和缩放级别
  setCenterPointAndZoom = (instance, point, zoom) => {
    instance.centerAndZoom(point, zoom);
  }
  // 添加控件
  addControl = (instance) => {
    instance.addControl(new BMap.NavigationControl());
    instance.addControl(new BMap.ScaleControl());
  }
  // 设置标注
  setMarker = (instance, point, dragable = false, dragCallback = null) => {
    const marker = new BMap.Marker(point);
    dragable && marker.enableDragging();
    instance.addOverlay(marker);
    if (dragable && dragCallback) {
      marker.addEventListener('dragend', dragCallback);
    }
  }
  // 标注折线
  setPolyline = (instance, polylines) => {
    const polylinePoint = polylines.map(item => new BMap.Point(item[0], item[1]));
    const polylineObj = new BMap.Polyline(polylinePoint, {
      strokeColor: 'blue',
      strokeWeight: 6,
      strokeOpacity: 0.5,
    });
    instance.addOverlay(polylineObj);
  }
  render() {
    return <div id="BdnetContainer" />;
  }
}

export default Bdnet;