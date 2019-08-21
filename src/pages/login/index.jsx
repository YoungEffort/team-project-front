/*
   登录
*/
import React, { Component } from 'react'
import { Form, message } from 'antd'
import './style.less'
import { loginPost, registerPost } from '@/api/login.js'
import Login from './login'
import Register from './register'

class LoginRegisterForm extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // 判断当前是登录还是注册 0 登录 1 注册
         isLoginRegister: 0, 
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
   goLoginRegister = () => {
      let { isLoginRegister } = this.state
      isLoginRegister = isLoginRegister === 0 ? 1 : 0
      this.props.form.resetFields()
      this.setState({
         isLoginRegister
      })
   }
   // 提交
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
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
   render () {
      let { isLoginRegister } = this.state
      const { getFieldDecorator } = this.props.form
      return (
         <div className = 'cy-login'>
            <div className = 'login-form'>
               <h3 className = 'login-form-title'>
                  { 
                     isLoginRegister === 0 ? 
                        <span>登&nbsp;&nbsp;录</span>
                        :
                        <span>注&nbsp;&nbsp;册</span>
                  }
               </h3>
               {
                  isLoginRegister === 0 ?
                     <Form onSubmit = { this.handleSubmit }>
                        <Login  getFieldDecorator = { getFieldDecorator } />
                     </Form>
                     :
                     <Form onSubmit = { this.registerSubmit }>
                        <Register  getFieldDecorator = { getFieldDecorator } />
                     </Form>
               }
               <div className = 'f-c login-operating-btn'>
                  <div className = 'f-l operating-btn' onClick = { this.goLoginRegister }> { isLoginRegister === 0 ? '注册' : '登录' }</div>
                  {
                     isLoginRegister === 0 ? <div className = 'f-r operating-btn'>忘记密码？</div> : ''
                  }
                  
               </div>
            </div>
         </div>
      )
   }
}
const LoginRegister = Form.create({ name: 'horizontal_login' })(LoginRegisterForm);
export default LoginRegister