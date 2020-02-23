/*
  接口函数
*/
import ajax from './ajax'

// 登录
export function register (username, password) {
  return ajax('/login', { username, password }, 'POST')
}

// 添加用户
export function addUser (user) {
  return ajax('/manage/user/add', user, 'POST')
}