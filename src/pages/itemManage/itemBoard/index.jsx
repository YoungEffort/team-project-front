/*
   项目看板
   秦国胜
   2019-08-26
*/
import React, { Component } from 'react'
import { Empty, Tooltip, Card, Icon, Button, message, Popconfirm } from 'antd'
import './style.less'
import ItemSearch from './component/search' // 查询
import AddCompileItem from './component/addCompileItem' // 新增--编辑
import PreviewModal from './component/previewModal' // 新增--编辑
import { clearTrim } from '@/utils/reg'
import {
   querylist,
   deleteProject,
   addProject,
   compileProject
} from '@/api/itemBoard'
class ItemBoard extends Component {
   constructor (props) {
      super(props);
      this.state = {
         // 新增编辑弹窗显示
         addMoadlVisible: false,
         // 新增编辑弹窗表单数据
         addCompileData: {
            pid: '', // 项目id
            img: '', // 项目预览图片
            pName: '', // 项目名称
            developer: '', // 开发人员
            description: '', // 项目描述
            type: '0', // 项目类型
            repositoryUrl: '', // 仓库地址
            testUrl: '' // 测试预览地址
         },
         // 测试预览信息弹窗
         previewModalVisible: false,
         // 判断是编辑还是新增
         isAddCompile: 0, // 0 新增 1 编辑
         popconfirmInit: {
            placement: 'top',
            title: '是否确认删除'
         },
         // 卡片数据
         cardData: [
            // {
            //    img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            //    title: '项目一',
            //    develop: '张三、李四、王麻子',
            //    describe: '企业级管理后台'
            // }
         ]
      };
   }
   componentDidMount () {
      this.initView();
   }
  // 视图初始化
  initView = ( queryData ) => {
     querylist({
        ...queryData
     }).then(res => {
        if (parseFloat(res.code) === 200) {
           this.setState({
              cardData: res.data
           });
        }
     });
  }
  // 搜索--查询
  queryItem = (e,form) => {
     e.preventDefault();
     form.validateFields((err, values) => {
        if (!err) {
           values = clearTrim(values)
           this.initView(values)
        }
     })
  }
  // 搜索--重置
  queryReset = (form) => {
     form.resetFields()
     this.initView()
  }
  // 新增和编辑--弹窗显示隐藏
  modalShowHide = form => {
     let { addMoadlVisible, addCompileData } = this.state;
     if (addMoadlVisible) {
        addMoadlVisible = false
        addCompileData = {
           pid: '', // 项目id
           img: '', // 项目预览图片
           pName: '', // 项目名称
           developer: '', // 开发人员
           description: '', // 项目描述
           type: '0',
           repositoryUrl: '', // 仓库地址
           testUrl: '' // 测试预览地址
        }
        form.resetFields()
     } else {
        addMoadlVisible = true
     }
     this.setState({
        addMoadlVisible,
        addCompileData
     });
  }
  // 新增和编辑--弹窗确定
  modalConfirm = (e, form) => {
     e.preventDefault();
     let { isAddCompile } = this.state;
     form.validateFields((err, values) => {
        if (!err) {
           values = clearTrim(values);
           isAddCompile === 0
              ? this.addItemPost(values, form)
              : this.compileItemPost(values, form);
        }
     });
  }
  // 点击新增按钮 显示弹窗
  addItem = () => {
     this.setState(
        {
           isAddCompile: 0
        },
        () => {
           this.modalShowHide();
        }
     );
  }
  // 新增--项目--提交
  addItemPost = (values, form) => {
     addProject({
        pName: values.pName,
        developer: values.developer,
        description: values.description,
        type: values.type, // 项目类型
        repositoryUrl: values.repositoryUrl, // 仓库地址
        testUrl: values.testUrl // 测试预览地址
     }).then(res => {
        if (parseFloat(res.code) === 200) {
           message.success('新增成功')
           this.modalShowHide(form)
           this.initView()
        }
     });
  }
  // 编辑--项目 数据获取
  compileItem = (e,item) => {
     e.stopPropagation()
     let _this = this;
     console.log(item)
     this.setState(
        {
           isAddCompile: 1,
           addCompileData: {
              ..._this.state.addCompileData,
              ...item
           }
        },
        () => {
           this.modalShowHide();
        }
     );
  }
  // 编辑--项目--提交
  compileItemPost = (values, form) => {
     compileProject({
        pid: this.state.addCompileData.pid,
        ...values
     }).then(res => {
        if (parseFloat(res.code) === 200) {
           message.success('编辑成功')
           this.modalShowHide(form)
           this.initView()
            
        }
     });
  }
  // 删除指定项目
  deletItem = (e,item) => {
     console.log('删除的数据', item.pid);
     deleteProject({
        id: item.pid
     })
        .then((res) => {
           if (parseFloat(res.code) === 200) {
              console.log(res)
              message.success('删除项目成功')
              this.initView()
           }
        })
  }
  // 项目
  render () {
     let {
        popconfirmInit,
        addMoadlVisible,
        addCompileData,
        cardData,
        previewModalVisible
     } = this.state;
     return (
        <div className = 'item-board'>
           <ItemSearch 
              queryItem = { this.queryItem }
              queryReset = { this.queryReset }
           />
           <div className = 'item-add'>
              <Button icon = 'plus' onClick = { this.addItem }>
            新增
              </Button>
           </div>
           <div className = 'item-board-card'>
              { cardData.map((item,index) => {
                 return (
                    <Card
                       key = { item.pid }
                       hoverable
                       className = { 'item-cards-'+ index }
                       cover = {
                          <img
                             className = 'item-card-img'
                             alt = ''
                             src = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                          />
                       }
                       actions = { [
                          <Tooltip
                             key = 'edit'
                             title = '编辑'
                             getPopupContainer = { () => document.querySelector('.item-board-card .item-cards-' + index) }
                             onClick = { (e) => {
                                this.compileItem(e,item);
                             } }
                          >
                             <Icon type = 'edit' />
                          </Tooltip>,

                          <Tooltip key = 'delete' title = '删除'
                             getPopupContainer = { () => document.querySelector('.item-board-card .item-cards-' + index) }
                          >
                             <Popconfirm
                                { ...popconfirmInit }
                                getPopupContainer = { () => document.querySelector('.item-board-card .item-cards-' + index) }
                                onConfirm = { (e) => this.deletItem(e,item) }
                             >
                                <Icon type = 'delete' />
                             </Popconfirm>
                          </Tooltip>,
                          <Tooltip key = 'ellipsis' title = '详情'
                             getPopupContainer = { () => document.querySelector('.item-board-card .item-cards-' + index) }
                          >
                             <Icon type = 'ellipsis' />
                          </Tooltip>
                       ] }
                    >
                       <p className = 'card-text leave_out cl-0'>
                           项目名称：{ item.pName }
                       </p>
                       <p className = 'card-text leave_out cl-1'>
                           开发人员：{ item.developer }
                       </p>
                       <p className = 'card-text leave_out cl-2'>
                           项目介绍：{ item.description }
                       </p>
                    </Card>
                 );
              }) }
           </div>
           <AddCompileItem
              addCompileData = { addCompileData }
              addMoadlVisible = { addMoadlVisible }
              modalShowHide = { this.modalShowHide }
              modalConfirm = { this.modalConfirm }
           />
           <PreviewModal
              previewModalVisible = { previewModalVisible }
           />
           {
              cardData && cardData.length <= 0 ?
                 <div className = 'g-no-data'>
                    <Empty />
                 </div>
                 : ''
           }
        </div>
     );
  }
}
export default ItemBoard;
