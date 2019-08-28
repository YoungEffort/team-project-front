/*
   项目看板
   秦国胜
   2019-08-26
*/
import React, { Component } from 'react'
import { Tooltip, Card, Icon, Button, message, Popconfirm } from 'antd'
import './style.less'
import ItemSearch from './component/search' // 查询
import AddCompileItem from './component/addCompileItem' // 新增
import { clearTrim } from '@/utils/reg'
import { querylist, deleteProject, addProject, compileProject } from '@/api/itemBoard'
let aa = ''
let dd = ''
class ItemBoard extends Component {
   constructor (props) {
      super (props)
      this.state = {
         // 弹窗显示
         addMoadlVisible: false,
         // 新增编辑弹窗数据
         addCompileData: {
            pid: '', // 项目id
            img: '', // 项目预览图片
            p_name: '', // 项目名称
            login_name: '', // 开发人员
            description: '' // 项目描述
         },
         // 判断是编辑还是新增
         isAddCompile: 0, // 0 新增 1 编辑
         popconfirmInit: {
            placement: 'top',
            title: '是否缺确认删除'
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
      }
   }
   componentDidMount () {
      this.initView()
   }
   // 视图初始化
   initView = () => {
      querylist({})
         .then((res) => {
            if (parseFloat(res.code) === 200) {
               this.setState({
                  cardData: res.data
               })
            }
         })
   }
   
   // 新增和编辑--弹窗显示隐藏
   modalShowHide = ( form ) => {
      let { addMoadlVisible, addCompileData } = this.state
      if (addMoadlVisible) {
         addMoadlVisible = false
         addCompileData = {
            pid: '', // 项目id
            img: '', // 项目预览图片
            p_name: '', // 项目名称
            login_name: '', // 开发人员
            description: '' // 项目描述
         },
         form.resetFields()
      } else {
         addMoadlVisible = true
      }
      this.setState({
         addMoadlVisible,
         addCompileData
      })
   }
   // 新增和编辑--弹窗确定
   modalConfirm = (e,form) => {
      e.preventDefault()
      let { isAddCompile } = this.state
      form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
            isAddCompile === 0 ? 
               this.addItemPost(values,form)
               :
               this.compileItemPost(values,form)
         }
      });
   }
   // 点击新增按钮 显示弹窗
   addItem = () => {
      this.setState({
         isAddCompile: 0
      }, () => {
         this.modalShowHide()
      })
   }
   // 新增--项目--提交
   addItemPost = (values, form) => {
      addProject({
         pName: values.pName,
         description: values.description
      })
         .then((res) => {
            if (parseFloat(res.code) === 200) {
               console.log(res)
               message.success('新增成功')
               this.modalShowHide(form)
            }
         })
   }
   // 编辑--项目 数据获取
   compileItem = (item) => {
      console.log(item)
      let _this = this
      this.setState ({
         isAddCompile: 1,
         addCompileData: {
            ... _this.state.addCompileData,
            ...item
         }
      },() => {
         this.modalShowHide()
      })
      
   }
   // 编辑--项目--提交
   compileItemPost = (values,form) => {
      console.log(values)
      compileProject
      compileProject({
         pName: values.pName,
         description: values.description
      })
         .then((res) => {
            if (parseFloat(res.code) === 200) {
               console.log(res)
               message.success('编辑成功')
               this.modalShowHide(form)
            }
         })
   }
   // 删除指定项目
   deletItem = (item) => {
      console.log('删除的数据', item.pid)
      // deleteProject({
      //    id
      // })
      //    .then((res) => {
      //       if (parseFloat(res.code) === 200) {
      //          console.log(res)
      //       }
      //    })
   }
   render () {
      let {
         popconfirmInit,
         addMoadlVisible,
         addCompileData,
         cardData 
      } = this.state
      return (
         <div className = 'item-board'>
            <ItemSearch />
            <div className = 'item-add'>
               <Button icon = 'plus' onClick = { this.addItem }>新增</Button>
            </div>
            <div className = 'item-board-card'>
               {
                  cardData.map((item) => {
                     return (
                        <Card
                           key = { item.pid }
                           hoverable
                           cover = {
                              <img
                                 className = 'item-card-img'
                                 alt = ''
                                 src = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                              />
                           }
                           actions = { [
                              <Tooltip key = 'edit' title = '编辑' onClick = { 
                                 () => {
                                    this.compileItem(item) 
                                 } 
                              }
                              >
                                 <Icon type = 'edit' />
                              </Tooltip>,
                             
                              <Tooltip key = 'delete' title = '删除'>
                                 <Popconfirm { ...popconfirmInit } onConfirm = { () => this.deletItem(item) }>
                                    <Icon type = 'delete' />
                                 </Popconfirm>
                              </Tooltip>,
                              <Tooltip key = 'ellipsis' title = '详情'>
                                 <Icon type = 'ellipsis' />
                              </Tooltip>
                           ] }
                        >
                           <p className = 'card-text leave_out cl-0'>项目名称：{ item.p_name }</p>
                           <p className = 'card-text leave_out cl-1'>开发人员：{ item.login_name }</p>
                           <p className = 'card-text leave_out cl-2'>项目介绍：{ item.description }</p>
                        </Card>
                     ) 
                  })
               }
            </div>
            <AddCompileItem
               addCompileData = { addCompileData }
               addMoadlVisible = { addMoadlVisible }
               modalShowHide = { this.modalShowHide }
               modalConfirm = { this.modalConfirm }
            />
         </div>
      )
   }
}
export default  ItemBoard