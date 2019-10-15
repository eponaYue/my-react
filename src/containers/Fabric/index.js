import React, { Component } from 'react';
import { fabric } from 'fabric';
import imgPath from '../../assets/1.jpg';
import './index.less';
//  Fabric: canvas库
class Fabric extends Component {
  cInstance = null;
  componentDidMount() {
    // 7. 颜色模式和相互转换
    const color1 = new fabric.Color("#e8efee");
    const color2 = new fabric.Color('rgb(120,46,84)');
    const color3 = new fabric.Color('rgba(120,46,84,0.4)');
    const color1RGB = color1.toRgb();
    const color2Hex = color2.toHex();
    // 1.创建实例
    this.cInstance = new fabric.Canvas('c1');
    // 2.简单图形
    const rect = new fabric.Rect({
      top: 10,
      left: 10,
      fill: color1,
      width: 50,
      height: 50,
    });
    // 5.设置动画
    rect.animate('angle', '+=60', {
      onChange: this.cInstance.renderAll.bind(this.cInstance),
      duration: 3000,
      easing: fabric.util.ease.easeInOutBounce,
    });
    // 添加事件监听
    rect.on('selected', opt => {
      console.log(opt);
      rect.setColor('#eeffdd');
    });
    const circle = new fabric.Circle({
      radius: 50,
      // fill: color3,
      strokeWidth: 1,
      stroke: '#8eefff',
      left: 10,
      top: 70,
    });
    // 8.设置渐变
    circle.setGradient('fill', {
      x1: circle.width,
      y1: 0,
      x2: 0,
      y2: circle.height,
      colorStops: {
        0: '#fff',
        1: '#000',
      },
    });
    const triangle = new fabric.Triangle({
      width: 50,
      height: 70,
      fill: color2,
      left: 10,
      top: 180,
    });
    // 3.图片
    // const imgEleInstance = document.getElementById('img-1');
    // const img = new fabric.Image(imgEleInstance, {
    //   top: 10,
    //   left: 70,
    //   width: 550,
    //   height: 317,
    //   angle: 15,
    // });
    // fabric.Image.fromURL(imgPath, oImg => {
    //   oImg.scale(0.5);
    //   this.cInstance.add(oImg);
    // });
    // 4.不规则图形By路径
    const path = new fabric.Path('M 0 0 L 50 80 L 40 120 z');
    path.set({
      left: 0,
      top: 260,
      fill: color1RGB,
    });
    // 6.图像过滤器
    fabric.Image.fromURL(imgPath, oImg => {
      oImg.filters.push(
        new fabric.Image.filters.Grayscale(),
        new fabric.Image.filters.Sepia({ brightness: 80 }),
      );
      oImg.applyFilters();
      this.cInstance.add(oImg);
    });
    // 9.文本填充
    const text = new fabric.Text('Epona is a girl', {
      top: 400,
      // fontFamily: 
      fontSize: 20,
      textBackgroundColor: '#8e8eff',
    });
    this.cInstance.add(rect, circle, triangle, path, text);
    // 10 事件系统
    this.cInstance.on('mouse:down', opt => {
      console.log(opt.e);
    });
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