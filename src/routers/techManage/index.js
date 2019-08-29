// 一级菜单---技术栈管理
import Loadable from '@/utils/loadable'; // 按需加载 组件
export default  {
   icon: 'deployment-unit',
   title: '技术栈管理',
   name: 'techManage',
   children: [
      {
         title: '技术栈看板',
         name: 'techBoard',
         path: '/techManage/techBoard',
         component: Loadable(() => import('@/pages/techManage/techBoard'))
      }
   ]
}