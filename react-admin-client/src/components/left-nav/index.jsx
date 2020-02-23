import React, { Component } from 'react';
import './index.less';
import logo from '@/assets/images/logo.png';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuConfig from '@/config/menuConfig';

const { SubMenu } = Menu;

function getMenuNodes (menuConfig, path) {
  let openKey = ''
  function createMenuNodes (menuConfig, path) {
    return menuConfig.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      }else {
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
            { createMenuNodes(item.children, path) }
          </SubMenu>
        ))
  
        if (item.children.find(cItem => cItem.key === path)) { // 需要展开
          openKey = item.key
        }
      }
      return pre
    }, [])
  }
  return {
    menuNodeList: createMenuNodes(menuConfig, path),
    openKey
  }
}

class LeftNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuNodeList: [],
      openKey: ''
    }
  }

  // 为第一次render准备数据
  static getDerivedStateFromProps (nextProps, prevState) {
    // console.log(nextProps)
    const path = nextProps.location.pathname
    return getMenuNodes(menuConfig, path)
  }

  render() {
    const selectKey = this.props.location.pathname
    const openKey = this.state.openKey
    const menuNodeList = this.state.menuNodeList

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          { menuNodeList }
        </Menu>
      </div>
    );
  }
}

// withRouter 高阶组件 传入location、history、match
export default withRouter(LeftNav)