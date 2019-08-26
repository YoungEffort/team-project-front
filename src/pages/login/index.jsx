/*
   登录
*/
import React, { Component } from 'react'
import { Form, message } from 'antd'
import './style.less'
import { loginPost, registerPost, forgetPassPost } from '@/api/login.js'
import Login from './login'
import Register from './register'
import ForgetPass from './forgetPass'
import { clearTrim } from '../../utils/reg'
class LoginRegisterForm extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // 判断当前是登录还是注册 0 登录 1 注册
         isShow: 0
      }
   }
   // 登录注册忘记密码组件切换
   goLoginRegister = (type) => {
      // 0 登录 1 注册 2 忘记密码 
      let { isShow } = this.state
      isShow = type
      this.props.form.resetFields()
      this.setState({
         isShow
      })
   }
   // 登录提交
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
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
            let newValues = JSON.parse(JSON.stringify(values))
            delete newValues.newPassword
            this.postRegister(newValues)
         }
      });
   }
   postRegister = (registerData) => {
      registerPost({
         ...registerData
      }).then((res) => {
         if (parseFloat(res.code) === 200) {
            message.success('注册成功')
            this.goLoginRegister(0)
         }
      }).carch((err) => {
         console.log(err)
      })  
   }
   // 忘记密码提交
   forgetPassSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
            this.postForgetPass(values)
         }
      });
   }
   postForgetPass = (ForgetPassData) => {
      forgetPassPost({
         ...ForgetPassData
      }).then((res) => {
         if (parseFloat(res.code) === 200) {
            message.success('重置密码成功')
            this.goLoginRegister(0)
         }
      }).carch((err) => {
         console.log(err)
      })  
   }
   //  页面展示
   viewsCompont = () => {
      let { isShow } = this.state
      const { getFieldDecorator, getFieldValue } = this.props.form

      switch (isShow) {
      case 1 :
         return (
                  <>
                     <h3 className = 'login-form-title'>
                        <span>注&nbsp;&nbsp;册</span>
                     </h3>
                     <Form onSubmit = { this.registerSubmit }>
                        <Register
                           getFieldDecorator = { getFieldDecorator }
                           getFieldValue = { getFieldValue }
                        />
                     </Form>
                  </>
         )
      case 2 :
         return (
                  <>
                     <h3 className = 'login-form-title'>
                        <span>忘记密码</span>
                     </h3>
                     <Form onSubmit = { this.forgetPassSubmit }>
                        <ForgetPass
                           getFieldDecorator = { getFieldDecorator }
                        />
                     </Form>
                  </>
         )   
      default : 
         return (
                  <>
                     <h3 className = 'login-form-title'>
                        <span>登&nbsp;&nbsp;录</span>
                     </h3>
                     <Form onSubmit = { this.handleSubmit }>
                        <Login  getFieldDecorator = { getFieldDecorator } />
                     </Form>
                  </>
         )
      }
   }
   render () {
      let { isShow } = this.state
      return (
         <div className = 'cy-login'>
            <div className = { isShow === 1 ? 'login-form login-form-w2' : 'login-form login-form-w1' }>
               {
                  this.viewsCompont()
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
                           <div className = 'f-r operating-btn' onClick = { () =>  this.goLoginRegister(2) }>忘记密码？</div>
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