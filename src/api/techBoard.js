import axios from '@/utils/http.js';
// import { BXFQ } from '@/api/server'

export const getTechstack = params => {
   return axios.request({
      url: '/api/get/techstack/querylist',
      method: 'get',
      params
   })
}

export const deleteTechstack = params => {
   return axios.request({
      url: '/api/techstack/deleteTech',
      method: 'post',
      data:params
   })
}
