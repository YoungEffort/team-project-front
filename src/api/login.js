import axios from '@/utils/http.js'
// import { BXFQ } from '@/api/server'

export const loginPost = params => {
   return axios.request({
      url: '/api/user/login',
      method: 'post',
      data: params
   })
}
