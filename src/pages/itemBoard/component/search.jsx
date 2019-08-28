// 搜索
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { clearTrim } from '@/utils/reg';
const FormItem = Form.Item;
class SearchForm extends Component {
  //查询
  querySubmit = e => {
     e.preventDefault();
     this.props.form.validateFields((err, values) => {
        if (!err) {
           values = clearTrim(values);
           console.log(values);
        }
     });
  };
  // 重置
  resetForm = () => {
     let { form } = this.props;
     form.resetFields();
  };
  render () {
     const { form } = this.props;
     const { getFieldDecorator } = form;
     return (
        <div className = 'item-search'>
           <Form layout = 'inline' onSubmit = { this.querySubmit }>
              <FormItem label = '项目名称'>
                 { getFieldDecorator('itemName', {})(
                    <Input type = 'text' placeholder = '请输入设置密码' />
                 ) }
              </FormItem>
              <FormItem label = '开发人员'>
                 { getFieldDecorator('developer', {})(
                    <Input type = 'text' placeholder = '请输入设置密码' />
                 ) }
              </FormItem>
              <FormItem className = 'form-btn'>
                 <Button
                    type = 'primary'
                    htmlType = 'submit'
                    icon = 'search'
                    className = 'query-btn'
                 >
              查询
                 </Button>
                 <Button icon = 'undo' onClick = { this.resetForm }>
              重置
                 </Button>
              </FormItem>
           </Form>
        </div>
     );
  }
}
const Search = Form.create({ name: 'login-from' })(SearchForm);
export default Search;
