import { combineReducers } from 'redux'
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER
} from './action-types'
import storageUtils from '@/utils/storageUtils'

/**
 * 管理headerTitle
 */
const initHeadTitle = '首页'

function headerTitle(state = initHeadTitle, action) {
  switch(action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/**
 * 管理user状态
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  switch(action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      return { // 不要直接修改原state
        ...state,
        errorMsg: action.errorMsg
      }
    case RESET_USER:
      return {}
    default:
       return state
  }
}

export default combineReducers({
  headerTitle,
  user
})