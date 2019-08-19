/*
   路由配置
   秦国胜
   2019-08-05
*/
import React,{ Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';                                
import ErrorBoundary from './errorBoundary';                               // 错误边界处理 加载失败时的显示
import RouterConfig from '@/routers/routerConfig' 
import { Layout }  from '@/components/index'
import Login from '@/pages/login/index';                                   // 登录组件单独处理
import ErrPage from '@/pages/404/404';                                     // 404 页面

class RouteApp extends Component {
   constructor (props){
      super(props)
   }
   // 递归渲染路由
   routerViews (data) {
      return data.map((item) => {
         if (item.children && item.children.length >0) {
            return this.routerViews(item.children)
         }
         if (item.component ){
            return (
               <Route path = { item.path }  component = { item.component }
                  key = { item.key }
               />
            )
         }
      })
   }
   render () {
      return (
         <ErrorBoundary>
            <Switch>
               <Route path = '/' exact component = { Login } />
               <Route path = '/login' exact component = { Login } />
               <Layout history = { this.props.history } >
                  <Switch>
                     { this.routerViews(RouterConfig) }
                     <Route exact component = { ErrPage } />
                  </Switch>
               </Layout>
               <Route exact component = { ErrPage } />
            </Switch>
         </ErrorBoundary>
      )
   }
}
   
export default withRouter(RouteApp)