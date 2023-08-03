/*
 * @Descripttion: 
 * @version: 
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-09 13:41:24
 */
import { TYPES } from '@/actions/UserActions';

export const userReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case TYPES.LOGIN_SUCCESS:
      return { ...state, ...payload.user };
    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
