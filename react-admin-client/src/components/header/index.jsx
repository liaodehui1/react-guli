import React, { Component } from 'react';
import './index.less';
import { formateDate } from '@/utils/dateUtils';
import { reqWeather } from '@/api/index';
import memoryUtils from '@/utils/memoryUtils';
import storageUtils from '@/utils/storageUtils';
import { withRouter } from 'react-router-dom';
import menuList from '@/config/menuConfig';
import { Modal } from 'antd';
import LinkButton from '../link-button/index';

function  getTitle (path) {
  let title
  const worker = (menuList) => {
    let len = menuList.length
    for(let i = 0; i < len; i++) {
      let item = menuList[i]
      if (item.key === path || path.includes(item.key)) {
        title = item.title
        return;
      }else if (item.children) {
        worker(item.children)
      }
    }
  }
  worker(menuList)
  return title
}

class Header extends Component {
  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: '',
    user: memoryUtils.user,
    title: '',
    pathname: ''
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.pathname !== nextProps.location.pathname) {
      // console.log('更新title', prevState.pathname, nextProps.location.pathname)
      const title =  getTitle(nextProps.location.pathname)
      return {
        title,
        pathname: nextProps.location.pathname
      }
    }
    return null
  }

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    console.log(dayPictureUrl, weather)
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now())
      })
    }, 1000)
  }

  logout = (e) => {
    e.preventDefault()
    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        // 移除登录状态
        memoryUtils.user = {}
        storageUtils.removeUser()
        // 跳转到登录界面
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount () {
    this.getWeather()
    this.getSysTime()
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  render() {
    const { sysTime, dayPictureUrl, weather, user, title } = this.state
    // const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{sysTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header)
