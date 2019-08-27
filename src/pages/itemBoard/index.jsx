/*
   项目看板
   秦国胜
   2019-08-26
*/
import React, { Component } from 'react'
import { Tooltip, Card, Icon, Row, Col, Button } from 'antd'
import './style.less'
import ItemSearch from './component/search' // 查询
import AddItem from './component/addItem' // 新增
import { clearTrim } from '@/utils/reg'
import { querylist, deleteProject, addProject } from '@/api/itemBoard'
import Item from 'antd/lib/list/Item';
class ItemBoard extends Component {
   constructor (props) {
      super (props)
      this.state = {
         // 弹窗显示
         addMoadlVisible: false,
         cardData: [
            {
               img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
               title: '项目一',
               develop: '张三、李四、王麻子',
               describe: '企业级管理后台'
            }
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
   // 删除指定项目
   deletItem = (id) => {
      deleteProject({
         id
      })
         .then((res) => {
            if (parseFloat(res.code) === 200) {
               console.log(res)
            }
         })
   }
   // 新增--弹窗显示隐藏
   addModalShowHide = (form) => {
      let { addMoadlVisible } = this.state
      if (addMoadlVisible) {
         addMoadlVisible = false
         form.resetFields()
      } else {
         addMoadlVisible = true
      }
      this.setState({
         addMoadlVisible
      })
   }
   // 新增--弹窗确定
   addModalConfirm = (e,form) => {
      e.preventDefault();
      form.validateFields((err, values) => {
         if (!err) {
            values = clearTrim(values)
            this.addItem(values,form)
         }
      });
   }
   // 新增--项目
   addItem = (values, form) => {
      addProject({
         pName: values.pName,
         description: values.description
      })
         .then((res) => {
            if (parseFloat(res.code) === 200) {
               console.log(res)
               this.addModalShowHide(form)
            }
         })
   }
   render () {
      let { addMoadlVisible, cardData } = this.state
      return (
         <div className = 'item-board'>
            <ItemSearch />
            <div className = 'item-add'>
               <Button icon = 'plus' onClick = { this.addModalShowHide }>新增</Button>
            </div>
            <div className = 'item-board-card'>
               {
                  cardData.map((item, index) => {
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
                              <Tooltip key = 'edit' title = '编辑'>
                                 <Icon type = 'edit' />
                              </Tooltip>,
                              <Tooltip key = 'delete' title = '删除'>
                                 <Icon type = 'delete' />
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
            <AddItem
               addMoadlVisible = { addMoadlVisible }
               addModalShowHide = { this.addModalShowHide }
               addModalConfirm = { this.addModalConfirm }
            />
         </div>
      )
   }
}
export default  ItemBoard