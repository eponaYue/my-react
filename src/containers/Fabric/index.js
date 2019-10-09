import React, { Component } from 'react';
import { fabric } from 'fabric';
import imgPath from '../../assets/1.jpg';
import './index.less';
//  Fabric: canvas库
class Fabric extends Component {
  cInstance = null;
  componentDidMount() {
    // 创建实例
    this.cInstance = new fabric.Canvas('c1');
    // 简单图形
    const rect = new fabric.Rect({
      top: 10,
      left: 10,
      fill: 'red',
      width: 50,
      height: 50,
    });
    const circle = new fabric.Circle({
      radius: 50,
      fill: '#2e8eff',
      left: 10,
      top: 70,
    });
    const triangle = new fabric.Triangle({
      width: 50,
      height: 70,
      fill: '#e6e6e6',
      left: 10,
      top: 180,
    });
    // 图片
    const imgEleInstance = document.getElementById('img-1');
    const img = new fabric.Image(imgEleInstance, {
      top: 10,
      left: 70,
      width: 550,
      height: 317,
      angle: 15,
    });
    fabric.Image.fromURL(imgPath, oImg => {
      oImg.scale(0.5);
      this.cInstance.add(oImg);
    });
    this.cInstance.add(rect, circle, triangle, img);
    console.log(fabric, this.cInstance)
  }
  render() {
    return <div className="page-content">
      <a href="http://fabricjs.com/">FabricJS：Fabric.js is a powerful and simple Javascript HTML5 canvas library ; Fabric provides interactive object model on top of canvas element Fabric also has SVG-to-canvas (and canvas-to-SVG) parser</a>
      <canvas id="c1" width="1000" height="500"></canvas>
      <img src={imgPath} style={{ display: 'none' }} id="img-1" />
    </div>;
  }
}

export default Fabric;