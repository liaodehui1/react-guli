/*
  接口函数
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

// 登录
export function register (username, password) {
  return ajax('/login', { username, password }, 'POST')
}

// 添加用户
export function addUser (user) {
  return ajax('/manage/user/add', user, 'POST')
}

// 天气请求
export function reqWeather (city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, res) => {
      if (!error && res.status === 'success') {
        const { dayPictureUrl, weather } = res.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      }else {
        message.error('获取天气信息失败')
      }
    })
  })
}