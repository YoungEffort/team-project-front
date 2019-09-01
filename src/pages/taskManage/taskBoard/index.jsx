// 任务管理 --- 任务看板
import React, { Component } from 'react'
import  { Empty } from 'antd'
import TaskTap from './taskTap'
import './style.less'

class TaskBoard extends Component {
   constructor (props) {
      super(props)
      this.state = {
         // tap 选中
         tapActive: '0',
         // 顶部tap
         tapData: [
            { key: '0', tapName: '新建' },
            { key: '1', tapName: '进行中' },
            { key: '2', tapName: '已关闭' }
         ]
      }
   }
   // 点击tap
   clickTap = (key) => {
      this.setState ({
         tapActive: key
      })
   }

   render () {
      let { tapActive,tapData }  = this.state
      return (
         <div className = 'task-board'>
            <TaskTap
               tapActive = { tapActive }
               tapData = { tapData }
               clickTap = { this.clickTap }
            />
            <div className = 'g-no-data'>
               <ul />
               <Empty />
            </div>
         </div>
      )
   }
}
export default TaskBoard