/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-08 17:00:05
 */
import {logout} from '@/reducers/LoginReducer';
import {ToastAndroid } from 'react-native';
import {store } from '@/store';


export const resInterceptor = {
  onFulfill(response) {
    console.log(response.data);
    if(response.data.code === 503){
      //token 过期
      store.dispatch(logout())
    }if(response.data.code === 401){
      //token 过期
      global.$toast('登录过期')
      store.dispatch(logout())
    }
    else if(response.data.code === 200){
      return response.data;
    }else if(response.data.code===500){

      ToastAndroid.showWithGravity(
        '系统异常，请联系管理员！',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
    else {
      return response;
    }
  },
  onReject(error) {
    if (error.response) {
      return Promise.reject(error.response);
    }

    if (error.request) {
      return Promise.reject({ error:'Connection error' });
    }

    return Promise.reject(error);
  },
};
