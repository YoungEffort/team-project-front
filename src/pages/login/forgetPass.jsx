/*
   忘记密码
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button  } from 'antd'
import { phone } from '@/utils/reg'
const FormItem = Form.Item
class forgetPass extends Component {
   componentDidMount () {
      document.title  = '忘记密码'
   }
   render () {
      const { getFieldDecorator } = this.props
      return (
         <>
            <FormItem>
               { getFieldDecorator('loginName', {
                  rules: [
                     { required: true, message: '请输入用户名' },
                     { whitespace: true, message: '不能输入空格' }
                  ]
               })(
                  <Input
                     prefix = { <Icon type = 'user' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                     placeholder = '请输入用户名'
                  />
               ) }
            </FormItem>
            <FormItem>
               { getFieldDecorator('phone', {
                  rules: [ 
                     { required: true, message: '请输入手机号' },
                     { whitespace: true, message: '不能输入空格' },
                     { pattern: phone, message: '手机号格式错误' }
                  ]
               })(
                  <Input
                     prefix = { <Icon type = 'mobile' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                     type = 'text'
                     maxLength = { 11 }
                     placeholder = '请输入手机号'
                  />
               ) }
            </FormItem>
            <FormItem>
               { getFieldDecorator('password', {
                  rules: [
                     { required: true, message: '请输入密码!' },
                     { whitespace: true, message: '不能输入空格' }
                  ]
               })(
                  <Input
                     prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                     type = 'password'
                     placeholder = '请输入设置密码'
                  />
               ) }
            </FormItem>
            <FormItem className = 'form-submit'>
               <Button type = 'primary' htmlType = 'submit'>确&nbsp;&nbsp;&nbsp;定</Button>
            </FormItem>
         </>
      )
   }
}
export default  forgetPass