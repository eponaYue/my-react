import React, { Component } from 'react';
import Script from 'react-load-script';
import coordtransform from 'coordtransform';
import './index.less';
import MarkerICon from '../../../assets/smoke.png';

function transferLngLats(lng: number, lat: number, type: string = 'gcj-02') {
  if ('WGS84' === type.toUpperCase()) {
    return coordtransform.wgs84togcj02(lng, lat);
  } else if ('BD-09' === type.toUpperCase()) {
    return coordtransform.bd09togcj02(lng, lat);
  }
  return [lng, lat];
}
/*eslint-disable*/
class Gdnet extends Component {
  map = null; // 地图实例
  cluster = null; // 聚合实例
  marker = null; // 标记实例
  fencer = null; // 围栏实例
  state = {
    centerPoints: [120.150218, 30.295514],
    isZooming: false,
  };
  // componentDidMount() {
  //   if (window.AMap) {
  //     console.log(window.AMap);
  //     this.map = new AMap.Map('gd-container', {
  //       zoom: 11, // 缩放级别
  //       center: [116.397428, 39.90923], // 中心点
  //       viewMode: '3D', // 视图模式
  //     });
  //   }
  // }
  componentWillUnmount() {
    this.map && this.map.destroy();
  }
  /***********地图功能函数*********************/
  thirdScriptCreate = param => {
    console.log('thirdScriptCreate:', param);
  }
  thirdScriptError = param => {
    console.log('thirdScriptError:', param);
  }
  /**
   * @function 第三方脚本加载完成
   */
  thirdScriptLoad = () => {
    // console.log('thirdScriptLoad:', AMap);
    const { centerPoints } = this.state;
    if (window.AMap) {
      this.map = new AMap.Map('gd-container', {
        zoom: 20, // 缩放级别 3~20
        zooms: [4, 18], //  地图级别范围
        center: centerPoints, // 中心点
        // viewMode: '3D', // 视图模式
        isHotspot: false, // 关闭地图热点和标注的hover效果
        labelzIndex: 9, // 地图标注显示顺序
        resizeEnable: true, // 监控地图容器尺寸变化
        doubleClickZoom: false, // 双击鼠标放大地图
        mapStyle: 'amap://styles/f02c0582061d9bf00d6eaf72651c116e',
        layers: [], // 地图图层数组
      });
      // 注册监听事件_平移和缩放，注意防抖和节流
      // this.map.on('movestart', this.onMapMoveStart);
      this.map.on('moveend', this.onMapMoveEnd);
      this.map.on('zoomchange', this.onZoomChange);
      // this.map.on('zoomstart', this.onZoomStart);
      // this.map.on('zoomend', this.onZoomEnd);
      // this.map.on('mousewheel', this.onMouseWheelZoom);
      // this.map.add(); //  1. 添加图层到地图
      const mapSize = this.map.getSize();
      // const southWest = new AMap.LngLat(0, 0);
      // const northEast = new AMap.LngLat(120, 60);
      // const bounds = new AMap.Bounds(southWest, northEast);
      // this.map.setBounds(bounds);
      console.log(mapSize, this.map.getCenter());
      // 创建Icon实例
      const icon = new AMap.Icon({
        size: new AMap.Size(50, 50),
        image: MarkerICon,
        // imageOffset: new AMap.Pixel(-25, -25),
        imageSize: new AMap.Size(50, 50),
      });
      // 构造标记点
      const marker = new AMap.Marker({
        icon,
        position: [116.397428, 39.90923],
        offset: new AMap.Pixel(-25, -25),
        title: '标记',
        zoom: 13,
      });
      const circle = new AMap.Circle({
        center: new AMap.LngLat(116.397428, 39.90923),
        radius: 1000,
        strokeColor: "#f33",
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: "#ee2200",
        fillOpacity: 0.35,
      });
      this.map.add([marker, circle]);
      this.map.on('click', (ev) => {
        const target = ev.target;
        const lnglat = ev.lnglat;
        const pixel = ev.pixel;
        const type = ev.type;
        console.log(ev);
      });
      console.log(this.map.getAllOverlays());
    }
  }
  // 地图中心点
  funcCenterPoint = param => {
    if (param && param.lng && param.lat) {
      const position = new AMap.LngLat(param.lng, param.lat);
      this.map.setCenter(position);
    } else {
      console.log('当前地图中心点：', this.map.getCenter());
      return this.map.getCenter();
    }
  };
  // 地图缩放级别
  funcMapZoom = param => {
    // PC 端zoom可设范围： 3~18
    if (param && param >= 3 && param <= 18) {
      this.map.setZoom(param);
    } else {
      console.log("当前级别：", this.map.getZoom());
      return this.map.getZoom();
    }
  };
  // 自动适配视野范围
  funcFitView = param => {
    // 传入覆盖物数组
    if (param && param.length > 0) {
      this.map.setFitView(param);
    } else {
      this.map.setFitView();
    }
  }
  // 地图视图范围
  funcBounds = param => {
    if (param && param.southWest && param.northEast) {
      // const southWest = new AMap.LngLat(0, 0);
      // const northEast = new AMap.LngLat(120, 60);
      const { southWest, northEast } = param;
      const bounds = new AMap.Bounds(southWest, northEast);
      this.map.setBounds(bounds);
    } else {
      console.log("视图范围：", this.map.getBounds());
      return this.map.getBounds();
    }
  }
  // 删除地图所有覆盖物
  funcClearMap = () => this.map && this.map.clearMap();
  // 注销地图对象，清空容器
  funcDestroyMap = () => this.map && this.map.destroy();
  // 地图平移开始
  // onMapMoveStart = (ev) => {
  //   console.log('平移开始MapMoveStart：', ev);
  // }
  // 地图平移结束_判断是否由于缩放产生的平移，若是，不做任何操作；否则，读取当前缩放级别和经纬度范围，根据缩放级别获取当前视图信息【终端聚合或是分散信息】。重置flag
  onMapMoveEnd = () => {
    console.log('平移结束MapMoveEnd：', this);
    const { isZooming } = this.state;
    if (isZooming) {
      this.setState({ isZooming: false });
    } else {
      console.log('平移结束刷新页面数据');
    }
  }
  // 地图缩放级别更改后_设置不执行平移结束flag_读取当前缩放级别和经纬度范围，根据缩放级别获取当前视图信息【终端聚合或是分散信息】
  onZoomChange = () => {
    console.log('缩放级别更改后ZoomChange：', this);
    this.setState({ isZooming: true }, () => {
      console.log('缩放更改结束刷新页面数据');
    })
  }
  // 地图缩放开始
  // onZoomStart = (ev) => {
  //   console.log('缩放开始ZoomStart：', ev);
  // }
  // 地图缩放停止
  // onZoomEnd = (ev) => {
  //   console.log('缩放停止ZoomEnd：', ev);
  // }
  // 鼠标滚轮缩放地图时触发
  // onMouseWheelZoom = (ev) => {
  //   console.log('鼠标滚轮缩放地图时触发MouseWheelZoom:', ev);
  // }
  /*************页面功能函数******************/
  render() {
    return (
      <div id="gd-container">
        <Script
          charset="utf-8"
          url="https://webapi.amap.com/maps?v=1.4.14&key=315f1cd1c8e1228c50144d0e039afd5b&plugin=AMap.MarkerClusterer"
          onCreate={this.thirdScriptCreate}
          onError={this.thirdScriptError}
          onLoad={() => this.thirdScriptLoad()}
        />
      </div>
    );
  }
}
export default Gdnet;