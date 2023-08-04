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
    url: baseURL+ '/sys/login/dept/tree',
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
  let url='/sys/menu/getAppMenuByRole'
  return networkService.request({
    url:baseURL+url,
    method:'get'
  })
}
export  const getUpdate= async ()=>{
  let url='/config/getProperties'
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
