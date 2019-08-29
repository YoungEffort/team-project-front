// 任务管理 --- 任务看板
import React, { Component } from 'react'
import  { Empty } from 'antd'

class TaskBoard extends Component {
   render () {
      return (
         <div>
            <div className = 'g-no-data'>
               <Empty />
            </div>
         </div>
      )
   }
}
export default TaskBoard