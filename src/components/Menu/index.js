import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './index.less';

const { Sider } = Layout;
const { SubMenu, Item } = Menu;
const menuData = [
  {
    name: '地图定位',
    key: 'map',
    icon: <Icon type="environment" />,
    children: [
      {
        name: '高德网络地图',
        key: 'netGD',
        path: '/map/netGD',
      },
      {
        name: '百度网络地图',
        key: 'netBD',
        path: '/map/netBD',
      },
      {
        name: '本地地图',
        key: 'localMap',
        path: '/map/localMap',
      },
    ],
  },
  {
    name: '数据展示',
    key: 'displayData',
    icon: <Icon type="area-chart" />,
    children: [
      {
        name: '图表数据展示',
        key: 'chart',
        path: '/displayData/chart'
      },
      {
        name: '表格数据展示',
        key: 'formOut',
        path: '/displayData/formOut',
      },
    ],
  },
  {
    name: '数据录入',
    key: 'dataInput',
    icon: <Icon type="form" />,
    children: [
      {
        name: '表单录入',
        key: 'formIn',
        path: '/dataInput/formIn',
      },
      {
        name: '文档图片',
        key: 'doc',
        path: '/dataInput/doc',
      },
    ],
  },
  {
    name: 'RTM实时通信',
    key: 'RTM',
    icon: <Icon type="message" />,
    children: [
      {
        name: '表单录入',
        key: 'rtm-data',
        path: '/RTM/rtm-data',
      },
      {
        name: '文档图像',
        key: 'rtm-video',
        path: '/RTM/rtm-video',
      },
    ],
  },
];
const getMenuData = (itemData) => {
  const title = itemData.icon ? <span><span>{itemData.icon}</span><span>{itemData.name}</span></span> : itemData.name;
  if (itemData.children) {
    return <SubMenu key={itemData.key} title={title}>{itemData.children.map(item => getMenuData(item))}</SubMenu>
  }
  return <Item key={itemData.key}><Link to={itemData.path}>{title}</Link></Item>
};
const getMenu = (menuData) => {
  if (Array.isArray(menuData) && menuData.length > 0) {
    const subMenu = menuData.map(itemData => getMenuData(itemData));
    return <Menu
      mode="inline"
    >
      {subMenu}
    </Menu>;
  }
  return null;
}

const SiderMenu = props => <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} className="sider-area">
  {getMenu(menuData)}
</Sider>

export default SiderMenu;
