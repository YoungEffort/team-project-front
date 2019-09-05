// 新增项目 编辑项目
import React, { Component } from 'react';
// import { Form, Input, Modal, Radio, Icon, Tooltip, Popconfirm, Upload, message } from 'antd';
import { Form, Input, Modal, Radio, Icon, Tooltip, Popconfirm } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
// function beforeUpload (file) {
//    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//    if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//    }
//    const isLt2M = file.size / 1024 / 1024 < 2;
//    if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//    }
//    return isJpgOrPng && isLt2M;
// }

function getBase64 (img, callback) {
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
}

class AddCompileItemFom extends Component {
   constructor (props) {
      super(props);
      this.state = {
         popconfirmInit: {
            placement: 'top',
            title: '是否确认删除'
         },
         modalInit: {
            title: '添加项目',
            width: 480,
            wrapClassName: 'add-itme-board-modal'
         },
         imageUrl: '',
         loading: false
      };
   }
   // 预览地址初始化
   initAddressView = () => {
      let { testUrlData, preAddrDelete, preAddrOnchange } = this.props
      let { popconfirmInit } = this.state;
      return testUrlData.map((item) => {
         return (
            <li className = 'test-address-content'  key = { item.key }>
               <div className = 'test-address-detailed'>
                  <div className = ' f-c test-address-row'>
                     <span className = 'f-l test-address-lable'>地址：</span> 
                     <div className = 'f-r'>
                        <Input placeholder = '请输入地址'
                           className =  { item.isError ? 'address-lable-err' : '' } 
                           value = { item.testUrl }
                           onChange = { (e) => preAddrOnchange(e,0,item) }
                        />
                        <div className = 'msg-text'>
                           {
                              item.isError ? item.msg : ''
                           }
                        </div>
                     </div>
                  </div>
                  <div className = ' f-c test-address-row'>
                     <span className = 'f-l'>备注：</span> 
                     <div className = 'f-r'>
                        <Input   placeholder = '请输入地址' value = { item.remark } onChange = { (e) => preAddrOnchange(e,1,item) } />
                     </div>
                  </div>
               </div>
               {
                  testUrlData.length > 1 ? 
                     <div className = 'test-address-operation'>
                        <Popconfirm
                           { ...popconfirmInit }
                           getPopupContainer = { () => document.querySelector('.test-address') }
                           onConfirm = { () => preAddrDelete(item) }
                        >
                           <Tooltip
                              title = '删除'
                              getPopupContainer = { () => document.querySelector('.test-address') }
                           >
                              <Icon type = 'delete' className = 'cl-2' />
                           </Tooltip>
                        </Popconfirm>
                     </div>:''
               }
               
            </li>
         )
      })
   }
   normFile = e => {
      if (Array.isArray(e)) {
         return e;
      }
      return e && e.fileList;
   };
   handleChange = info => {
      if (info.file.status === 'uploading') {
         this.setState({ loading: true });
         return;
      }
      if (info.file.status === 'done') {
         // Get this url from response in real world.
         getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
               imageUrl,
               loading: false
            })
         );
      }
   };
   render () {
      //  let { modalInit,imageUrl  } = this.state;
      let { modalInit } = this.state;
      let { addMoadlVisible, form, modalShowHide, modalConfirm, preAddrAdd } = this.props;
      const { getFieldDecorator } = form;
      // const uploadButton = (
      //    <div>
      //       <Icon type = { this.state.loading ? 'loading' : 'plus' } />
      //       <div className = 'ant-upload-text'>Upload</div>
      //    </div>
      // );
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
                        placeholder = '请输入项目描述，200字以内'
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
               { /* <FormItem label = '项目图片'>
                  <div className = 'dropbox'>
                     { getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules: [
                           { required: true, message: '请上传项目图片!' }
                        ]
                     })(
                        <Upload
                           name = 'avatar'
                           listType = 'picture-card'
                           className = 'avatar-uploader'
                           showUploadList = { false }
                           action = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                           beforeUpload = { beforeUpload }
                           onChange = { this.handleChange }
                        >
                           { imageUrl ? <img src = { imageUrl } alt = 'avatar' style = { { width: '100%' } } /> : uploadButton }
                        </Upload>
                     ) }
                  </div>
               </FormItem> */ }
               <FormItem label = '仓库地址'>
                  { getFieldDecorator('repositoryUrl', {
                     rules: [
                        { required: true, message: '请输入仓库地址' },
                        { whitespace: true, message: '不能输入空格' }
                     ]
                  })(<Input placeholder = '请输入仓库地址' />) }
               </FormItem>
               <div className = 'board-modal-address'>
                  <h6 className = 'address-title f-c'>
                     <span className = 'f-l address-title-text'>测试预览地址</span>
                     <span  className = 'f-r address-add' onClick = { preAddrAdd }>
                        <Icon type = 'plus' />
                        添加
                     </span>
                  </h6>
                  <ul className = 'test-address' >
                     {
                        this.initAddressView()
                     }
                  </ul>
               </div>
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
         })
      };
   }
})(AddCompileItemFom);
export default AddCompileItem;
