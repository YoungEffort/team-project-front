// 一级菜单---技术栈管理
import Loadable from '@/utils/loadable'; // 按需加载 组件
export default  {
   icon: 'team',
   title: '人员管理',
   name: 'peopleManage',
   children: [
      {
         title: '人员管理',
         name: 'peopleManage',
         path: '/peopleManage/peopleManage',
         component: Loadable(() => import('@/pages/peopleManage/peopleManage'))
      }
   ]
}