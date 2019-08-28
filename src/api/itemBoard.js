// 项目管理-项目看板
import axios from '@/utils/http.js'
// 列表
export const querylist = params => {
   return axios.request({
      url: '/api/get/project/querylistpro',
      method: 'get',
      params: params
   })
}
// 删除
export const deleteProject = params => {
   return axios.request({
      url: '/api/project/deleteProject',
      method: 'post',
      data: params
   })
}
// 新增
export const addProject = params => {
   return axios.request({
      url: '/api/project/addProject',
      method: 'post',
      data: params
   })
}
// 编辑
export const compileProject = params => {
   return axios.request({
      url: '/api/project/addProject',
      method: 'post',
      data: params
   })
}