import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './style.less'
import { loginPost } from '@/api/login.js'
const FormItem = Form.Item
class LoginForm extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // 登录信息
         formData: {
            loginName: '',
            password: ''
         }  
      }
   }
   componentDidMount () {
      document.title  = '登录'
   }
   goPage = () => {
      this.props.history.push({ pathname: '/home' })
   }
   // 提交
   handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            this.setState({
               ...values
            })
            loginPost({
               ...values
            }).then((res) => {
               console.log(res)
            }).carch((err) => {
               console.log(err)
            })
         }
      });
   }
   render () {
      const { getFieldDecorator } = this.props.form
      return (
         <div className = 'cy-login'>
            <div className = 'login-form'>
               <Form  onSubmit = { this.handleSubmit }>
                  <FormItem>
                     { getFieldDecorator('loginName', {
                        rules: [ { required: true, message: '请输入用户名!' } ]
                     })(
                        <Input
                           prefix = { <Icon type = 'user' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                           placeholder = '请输入用户名'
                        />
                     ) }
                  </FormItem>
                  <FormItem>
                     { getFieldDecorator('password', {
                        rules: [ { required: true, message: '请输入登录密码!' } ]
                     })(
                        <Input
                           prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                           type = 'password'
                           placeholder = '请输入登录密码'
                        />
                     ) }
                  </FormItem>
                  <FormItem className = 'form-submit'>
                     <Button type = 'primary' htmlType = 'submit'>登&nbsp;&nbsp;&nbsp;录</Button>
                  </FormItem>
               </Form>
               <div className = 'f-c login-operating-btn'>
                  <div className = 'f-l operating-btn' onClick = { this.goPage }>注册</div>
                  <div className = 'f-r operating-btn'>忘记密码？</div>
               </div>
            </div>
         </div>
      )
   }
}
const Login = Form.create({ name: 'horizontal_login' })(LoginForm);
export default Login