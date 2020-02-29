import React, { Component } from 'react';
import './index.less';
import logo from '@/assets/images/logo.png';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuList from '@/config/menuConfig';

const { SubMenu } = Menu;

function getOpenKey(path) {
  let openKey = []
  const worker = (menuList) => {
    let len = menuList.length
    for (let i = 0; i < len; i++) {
      let item = menuList[i]
      if (item.key === path) {
        return true;
      }else if (item.children) {
        if (worker(item.children)) {
          openKey.push(item.key)
          return true;
        }
      }
    }
  }
  worker(menuList)
  return openKey
}

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectKey: '',
      menuNodeList: this.getMenuNodes(menuList),
      openKey: []
    }
  }

  // 为第一次render准备数据
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('nextProps', nextProps)
    let path = nextProps.location.pathname
    if (path !== prevState.selectKey) {
      // 解决进入product下子路由界面时不选中和打开问题
      if (path.indexOf('/product') !== -1) { 
        path = '/product'
      }

      // if (path.lastIndexOf('/') !== 0)
      // 个人认为二级路由最好是 /一级路由/二级路由，当为无二级路由时省去获取openKey
      return {
        selectKey: path,
        openKey: getOpenKey(path)
      }
    }
    return null
  }

  // 获取菜单项
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  render() {
    const { selectKey, openKey, menuNodeList } = this.state
    // console.log(selectKey, openKey)
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[selectKey]}
          defaultOpenKeys={openKey}
          mode="inline"
          theme="dark"
        >
          {menuNodeList}
        </Menu>
      </div>
    );
  }
}

// withRouter 高阶组件 传入location、history、match
export default withRouter(LeftNav)