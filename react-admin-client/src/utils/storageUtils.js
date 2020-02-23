import store from 'store'
/*
  原生做法
  local storage的工具函数模块
*/
const USER_KEY = 'user_key'

export default {
  saveUser(user) {
    // localStorage 只能保存string，如果传递的是对象则会自动调用toString()
    // localStorage.setItem(key, value) value必须是字符串
    store.set(USER_KEY, user)
  },
  getUser() {
    return store.get(USER_KEY) || {}
  },
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}