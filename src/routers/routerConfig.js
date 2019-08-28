/*
   路由配置 定义按需加载
   2019-06-08
*/

// 按需加载
import Loadable from '@/utils/loadable'; // 组件
import Home from '@/pages/home/index';
const routerData = [
   {
      icon: 'home',
      title: '首页',
      path: '/home',
      component: Home,
      isType: true
   },
   {
      icon: 'deployment-unit',
      title: '项目管理',
      name: 'itemAdmin',
      children: [
         {
            title: '项目看板',
            name: 'itemBoard',
            path: '/itemAdmin/itemBoard',
            component: Loadable(() => import('@/pages/itemBoard'))
         }
      ]
   },
   {
      icon: 'deployment-unit',
      title: '技术栈管理',
      name: 'tech',
      children: [
         {
            title: '技术栈看板',
            name: 'techBoard',
            path: '/tech/techBoard',
            component: Loadable(() => import('@/pages/techBoard'))
         }
      ]
   }
];

// 添加key 防止添加错误
let initMenuData = routerConfig => {
   let init = (routers, parentKey) => {
      routers.forEach((item, index) => {
         item.key = parentKey + index;
         if (item.children && item.children.length > 0) {
            init(item.children, item.key + '-');
         }
      });
   };
   init(routerConfig, '');
};
initMenuData(routerData);
export default routerData;
