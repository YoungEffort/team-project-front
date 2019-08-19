/*
*  ajax 请求封装
*  秦国胜
*  2019/08/06
*/

import Axios from 'axios';
import config from '@/config/config'
import { isLocalDev } from '@/api/server'


// 接口白名单
const whiteList = [ '' ]
/* eslint-disable no-unused-vars */
const isInWhiteList = function (url) {
   let flag = false
   whiteList.forEach(function (e) {
      if (url.indexOf(e) >= 0) {
         flag = true
      }
   })
   return flag
}

// 超时时间
Axios.defaults.timeout = 30000
// 请求地址
Axios.defaults.baseURL = isLocalDev === true ? '' : config[process.env.PROCESS_ENV].BASE_URL

// 请求拦截
Axios.interceptors.request.use(
   config => {
      // if (!isInWhiteList(config.url)) {}
      return config
   },
   err => {
      return Promise.reject(err)
   }
)

// 响应拦截
Axios.interceptors.response.use(
   response => {
      return response.data
   },
   error => {
      return Promise.reject(error)
   }
)
 
export default Axios