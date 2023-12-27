/*
 * @Descripttion:
 * @version:
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-27 14:04:34
 */
import { baseURL } from "@/networking/config"

import { networkService } from '@/networking/NetworkService';
export const getDeptList = async () => {
  console.log("url-----",baseURL+ '/yiya-erp/system/dept/tree',)
  return networkService.request({
    url: baseURL+ '/appserver/sys/login/dept/tree',
    method: 'get',
  });
};
export const getPatientList = async (options)=>{
  if(!options.startDate){
    const date = new Date()
    options.startDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate ()}`
    options.endDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate ()}`
  }
   const url = options.keywordSearch?
   `/yiya-erp/erp/appointment/list/doctor?clinicId=${options.deptId}&treatBeginTime=${options.startDate} 00:00:00&treatEndTime=${options.endDate} 23:59:59&keywordSearch=${options.keywordSearch}`:
   `/yiya-erp/erp/appointment/list/doctor?clinicId=${options.deptId}&treatBeginTime=${options.startDate} 00:00:00&treatEndTime=${options.endDate} 23:59:59`
  return networkService.request({
    url:baseURL+url,
    method:'get'
  })
}
export  const getUserMenu= async ()=>{
  let url='/appserver/sys/menu/getAppMenuByRole'
  return networkService.request({
    url:baseURL+url,
    method:'get'
  })
}
export  const getUpdate= async ()=>{
  let url='/appserver/config/ios/getProperties'
  return networkService.request({
    url:baseURL+url,
    method:'get'
  })
}
export  const saveLog= async (data)=>{
  let url='/log/saveLog'
  return networkService.request({
    url:baseURL+url,
    method:'post',
    data:data
  })
}
// 账号密码登录
export  const loginPwd= async (data)=>{
  let url='/yiya-erp/login'
  return networkService.request({
    url:baseURL+url,
    method:'post',
    data:data
  })
}
// 获取用户信息
export  const loginInfo= async ()=>{
  let url='/yiya-erp/getInfo'
  return networkService.request({
    url:baseURL+url,
    method:'get'
  })
}
