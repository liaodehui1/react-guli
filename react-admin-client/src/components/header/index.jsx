import React, { Component } from 'react';
import './index.less';
import { formateDate } from '@/utils/dateUtils';
import { reqWeather } from '@/api/index';
import memoryUtils from '@/utils/memoryUtils';
// import storageUtils from '@/utils/storageUtils';
import { withRouter } from 'react-router-dom';
// import menuList from '@/config/menuConfig';
import { Modal } from 'antd';
import LinkButton from '../link-button/index';
import { connect } from 'react-redux';
import { logout } from '@/redux/actions';

// 不使用redux时
// function  getTitle (path) {
//   let title
//   const worker = (menuList) => {
//     let len = menuList.length
//     for(let i = 0; i < len; i++) {
//       let item = menuList[i]
//       if (item.key === path || path.includes(item.key)) { // 子路由也要由title
//         title = item.title
//         return;
//       }else if (item.children) {
//         worker(item.children)
//       }
//     }
//   }
//   worker(menuList)
//   return title
// }

class Header extends Component {
  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: '',
    user: memoryUtils.user,
    // title: '',
    pathname: ''
  }

  // 不使用redux时
  // static getDerivedStateFromProps (nextProps, prevState) {
  //   if (prevState.pathname !== nextProps.location.pathname) {
  //     // console.log('更新title', prevState.pathname, nextProps.location.pathname)
  //     const title =  getTitle(nextProps.location.pathname)
  //     return {
  //       title,
  //       pathname: nextProps.location.pathname
  //     }
  //   }
  //   return null
  // }

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
        // memoryUtils.user = {}
        this.props.logout() // 退出后admin拦截自动跳转
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
    const { sysTime, dayPictureUrl, weather, user } = this.state
    // const title = this.getTitle()
    const title = this.props.headerTitle
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

// withRouter 给不是通过路由切换过来的组件传入location、history、match属性
export default connect(
  (state) => ({ headerTitle: state.headerTitle }),
  { logout }
)(withRouter(Header))
