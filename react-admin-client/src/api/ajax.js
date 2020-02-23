/*
  能发送异步请求的函数
  封装axios
  函数返回Promise对象
*/

import axios from 'axios'
import { message } from 'antd'

axios.defaults.baseURL = 'http://localhost:5000'

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (method.toUpperCase() === 'GET') {
      promise = axios.get(url, { // 配置对象
        params: data // 指定参数
      })
    }else if (method.toUpperCase() === 'POST') {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      message.error('请求错误' + error.message)
    })
  })
}