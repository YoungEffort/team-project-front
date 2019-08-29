// 新增项目 编辑项目
import React, { Component } from 'react';
import { Form, Input, Modal, Radio } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
class AddCompileItemFom extends Component {
   constructor (props) {
      super(props);
      this.state = {
         modalInit: {
            title: '添加项目',
            width: 480,
            wrapClassName: 'add-itme-board-modal'
         }
      };
   }
   render () {
      let { modalInit } = this.state;
      let { addMoadlVisible, form, modalShowHide, modalConfirm } = this.props;
      const { getFieldDecorator } = form;
      return (
         <Modal
            { ...modalInit }
            visible = { addMoadlVisible }
            onOk = { e => modalConfirm(e, form) }
            onCancel = { () => modalShowHide(form) }
         >
            <Form layout = 'inline'>
               <FormItem label = '项目名称'>
                  { getFieldDecorator('pName', {
                     rules: [
                        { required: true, message: '请输入项目名称' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入项目名称' />) }
               </FormItem>
               <FormItem label = '开发人员'>
                  { getFieldDecorator('developer', {
                     rules: [
                        { required: true, message: '请输入开发人员' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(
                     <TextArea
                        autosize = { { minRows: 3, maxRows: 3 } }
                        placeholder = '请输入开发人员，多个开发人员以“ , ”隔开'
                     />
                  ) }
               </FormItem>
               <FormItem label = '项目描述'>
                  { getFieldDecorator('description', {
                     rules: [
                        { required: true, message: '请输入项目描述!' },
                        { whitespace: true, message: '不能输入空格' },
                        { max: 200, message: '项目描述最大字数200' }
                     ]
                  })(
                     <TextArea
                        autosize = { { minRows: 4, maxRows: 4 } }
                        placeholder = '请输入项目描述，两百字以内'
                     />
                  ) }
               </FormItem>
               <Form.Item label = '项目类型'>
                  { getFieldDecorator('type')(
                     <Radio.Group>
                        <Radio value = '0'>PC端</Radio>
                        <Radio value = '1'>移动端</Radio>
                     </Radio.Group>
                  ) }
               </Form.Item>
               <FormItem label = '仓库地址'>
                  { getFieldDecorator('repositoryUrl', {
                     rules: [
                        { required: true, message: '请输入仓库地址' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入仓库地址' />) }
               </FormItem>
               <FormItem label = '测试预览地址'>
                  { getFieldDecorator('testUrl', {
                     rules: [
                        { required: true, message: '请输入测试预览地址' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入测试预览地址' />) }
               </FormItem>
               { /* <FormItem label = '项目图片'>
                  { getFieldDecorator('upImg', {
                     rules: [
                        { required: true, message: '请上传项目图片!' }
                     ]
                  })(
                     <div>111</div>
                  ) }
               </FormItem> */ }
            </Form>
         </Modal>
      );
   }
}

const AddCompileItem = Form.create({
   name: 'add-compile-from',
   mapPropsToFields (props) {
      return {
         pName: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.pName
         }),
         developer: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.developer
         }),
         description: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.description
         }),
         type: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.type
         }),
         repositoryUrl: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.repositoryUrl
         }),
         testUrl: Form.createFormField({
            ...props.addCompileData,
            value: props.addCompileData.testUrl
         })
      };
   }
})(AddCompileItemFom);
export default AddCompileItem;
