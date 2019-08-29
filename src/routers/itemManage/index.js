// 一级菜单---项目管理

import Loadable from '@/utils/loadable'; // 按需加载 组件
export default {
   icon: 'deployment-unit',
   title: '项目管理',
   name: 'itemManage',
   children: [
      {
         title: '项目看板',
         name: 'itemBoard',
         path: '/itemManage/itemBoard',
         component: Loadable(() => import('@/pages/itemManage/itemBoard'))
      }
   ]
}