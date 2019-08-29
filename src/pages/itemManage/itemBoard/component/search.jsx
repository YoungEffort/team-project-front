// 搜索
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
class SearchForm extends Component {
   render () {
      const { form, queryItem, queryReset } = this.props;
      const { getFieldDecorator } = form;
      return (
         <div className = 'item-search'>
            <Form layout = 'inline' onSubmit = { (e) => queryItem(e,form) }>
               <FormItem label = '项目名称'>
                  { getFieldDecorator('pName', {})(
                     <Input type = 'text' placeholder = '请输入项目名称' />
                  ) }
               </FormItem>
               <FormItem label = '开发人员'>
                  { getFieldDecorator('developer', {})(
                     <Input type = 'text' placeholder = '请输入开发人员' />
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
                  <Button icon = 'undo' onClick = { () => queryReset(form) }>
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
