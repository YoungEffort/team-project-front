import axios from '@/utils/http.js'
// import { BXFQ } from '@/api/server'

export const getTechstack = params => {
   return axios.request({
      url: '/api/get/techstack/querylist',
      method: 'get',
      params
   })
}
