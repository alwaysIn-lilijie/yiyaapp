/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-13 23:16:58
 */
import { combineReducers } from 'redux';
import { userReducer } from '@/reducers/UserReducer';


//这个表示把多个reducer连接起来，
import loginReducer from '@/reducers/LoginReducer';
import deptReducer from '@/reducers/DeptReducer';
export const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  dept:deptReducer
});
