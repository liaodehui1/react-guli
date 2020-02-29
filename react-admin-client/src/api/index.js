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

// 获取一级/二级分类列表
export function reqCategorys (parentId) {
  return ajax('/manage/category/list', { parentId }, 'GET')
}

// 添加分类
export function reqAddCategory ({ parentId, categoryName }) {
  return ajax('/manage/category/add', { parentId, categoryName }, 'POST')
}

// 更新分类
export function reqUpdateCategory ({ categoryId, categoryName }) {
  return ajax('/manage/category/update', { categoryId, categoryName }, 'POST')
}

// 根据分类ID获取分类
export function reqCategoryById (categoryId) {
  return ajax('/manage/category/info', { categoryId }, 'GET')
}

// 获取商品分页列表
export function reqProducts (pageNum, pageSize) {
  return ajax('/manage/product/list', { pageNum, pageSize }, 'GET')
}

// 根据ID/Name搜索产品分类列表
export function reqSearchProducts ({ pageSize, pageNum, searchType, searchName }) {
  return ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
  })
}

// 添加/更新商品
export function reqAddOrUpdateProduct (product) {
  return ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
}

// 对商品进行上架/下架处理
export function reqUpdateProductStatus (productId, status) {
  return ajax('/manage/product/updateStatus', {
    productId,
    status
  }, 'POST')
}

// 删除图片
export function reqDeleteImg (name) {
  return ajax('/manage/img/delete', { name }, 'POST')
}