/*
   注册
   秦国胜
   2019-08-21
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button  } from 'antd'
const FormItem = Form.Item
class Register extends Component {
   componentDidMount () {
      document.title  = '注册'
   }
   render () {
      const { getFieldDecorator } = this.props
      return (
         <>
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
               rules: [ { required: true, message: '请输入密码!' } ]
            })(
               <Input
                  prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                  type = 'password'
                  placeholder = '请输入密码'
               />
            ) }
         </FormItem>
         <FormItem>
            { getFieldDecorator('newPassword', {
               rules: [ { required: true, message: '请输入密码!' } ]
            })(
               <Input
                  prefix = { <Icon type = 'lock' style = { { color: 'rgba(0,0,0,.25)' } } /> }
                  type = 'password'
                  placeholder = '请再次输入密码'
               />
            ) }
         </FormItem>
         <FormItem className = 'form-submit'>
            <Button type = 'primary' htmlType = 'submit'>提&nbsp;&nbsp;&nbsp;交</Button>
         </FormItem>
      </>
      )
   }
}
export default Register