/*
   登录
*/
import React, { Component } from 'react'
import { Form, message } from 'antd'
import './style.less'
import { loginPost, registerPost } from '@/api/login.js'
import Login from './login'
import Register from './register'
import { clearTrim } from '../../utils/reg'
class LoginRegisterForm extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // 判断当前是登录还是注册 0 登录 1 注册
         isShow: 0, 
         // 登录信息
         loginData: {
            loginName: '',
            password: ''
         },
         // 注册数据
         registerData: {
            loginName: '',
            password: ''
         }
      }
   }
   // 登录注册组件切换
   goLoginRegister = (type) => {
      // 0 登录 1 注册 2 忘记密码 
      let { isShow } = this.state
      isShow = type
      this.props.form.resetFields()
      this.setState({
         isShow
      })
   }
   // 提交
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
            console.log(values)
            this.setState({
               loginData: {
                  ...values
               }
            })
            this.postLogin(values)
         }
      });
   }
   // 发起登录请求
   postLogin = (loginData) => {
      loginPost({
         ...loginData
      }).then((res) => {
         if (parseFloat(res.code) === 200) {
            sessionStorage.user_info = JSON.stringify({
               access_token: res.data
            })
            message.success('登录成功')
            this.props.history.push({ pathname: '/home' })
         }
      })
   }
   // 注册提交
   registerSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
            this.setState({
               registerData: {
                  ...values
               }
            })
            this.postRegister(values)
         }
      });
   }
   postRegister = (registerData) => {
      registerPost({
         ...registerData
      }).then((res) => {
         if (parseFloat(res.code) === 200) {
            message.success('注册成功')
            this.goLoginRegister()
         }
      }).carch((err) => {
         console.log(err)
      })  
   }
   //  忘记密码提交
   // viewsCompont = () => {
      
   // }
   render () {
      let { isShow } = this.state
      const { getFieldDecorator, getFieldValue } = this.props.form
      return (
         <div className = 'cy-login'>
            <div className = { isShow === 0 ? 'login-form login-form-w1' : 'login-form login-form-w2' }>
               <h3 className = 'login-form-title'>
                  {
                     isShow === 0 ?  <span>登&nbsp;&nbsp;录</span> : ''
                  }
                  {
                     isShow === 1 ?  <span>注&nbsp;&nbsp;册</span> : ''
                  }
                  {
                     isShow === 2 ?  <span>忘记密码</span> : ''
                  }
               </h3>
               { 
                  isShow === 0 ? 
                     <Form onSubmit = { this.handleSubmit }>
                        <Login  getFieldDecorator = { getFieldDecorator } />
                     </Form> : ''
               }
               { 
                  isShow === 1 ? 
                     <Form onSubmit = { this.registerSubmit }>
                        <Register
                           getFieldDecorator = { getFieldDecorator }
                           getFieldValue = { getFieldValue }
                        />
                     </Form> : ''
               }
               { 
                  isShow === 2 ? 
                     <Form onSubmit = { this.registerSubmit }>
                        <Register
                           getFieldDecorator = { getFieldDecorator }
                           getFieldValue = { getFieldValue }
                        />
                     </Form> : ''
               }
               <div className = 'f-c login-operating-btn'>
                  { 
                     isShow === 0 || isShow === 1 ? 
                        <>
                           {
                              isShow === 0 ?
                                 <div className = 'f-l operating-btn' onClick = { () => this.goLoginRegister(1) }>注册</div>
                                 : 
                                 <div className = 'f-l operating-btn' onClick = { () =>  this.goLoginRegister(0) }>登录</div>
                           }
                           <div className = 'f-r operating-btn' onClick = { () =>  this.goLoginRegister(1) }>忘记密码？</div>
                        </> 
                        :
                        <>
                           <div className = 'f-l operating-btn' onClick = { () =>  this.goLoginRegister(0) }>登录</div>
                           <div className = 'f-r operating-btn' onClick = { () =>  this.goLoginRegister(1) }>注册</div>
                        </>
                  }  
               </div>
            </div>
         </div>
      )
   }
}
const LoginRegister = Form.create({ name: 'horizontal_login' })(LoginRegisterForm);
export default LoginRegister