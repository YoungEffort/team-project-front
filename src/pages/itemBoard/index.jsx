/*
   项目看板
   秦国胜
   2019-08-26
*/
import React, { Component } from 'react'
import { Tooltip, Card, Icon, Row, Col } from 'antd'
import './style.less'
class ItemBoard extends Component {
   constructor (props) {
      super (props)
      this.state = {
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
   // 视图初始化
   // initView = () => {
   // }
   render () {
      return (
         <div className = 'item-board'>
            <Row gutter = { 24 }>
               <Col className = 'gutter-row' span = { 4 }>
                  <Card
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
                        <Tooltip key = 'ellipsis' title = '详情'>
                           <Icon type = 'ellipsis' />
                        </Tooltip>,
                        <Tooltip key = 'delete' title = '删除'>
                           <Icon type = 'delete' />
                        </Tooltip>
                     ] }
                  >
                     <p className = 'card-text leave_out cl-0'>项目名称：项目-1</p>
                     <p className = 'card-text leave_out cl-1'>开发人员：开发-1，开发-2</p>
                     <p className = 'card-text leave_out cl-2'>项目介绍：企业级后台管理</p>
                  </Card>
               </Col>    
            </Row>
            { /* <Row gutter = { 24 }>     
            </Row> */ }
         </div>
      )
   }
}
export default  ItemBoard