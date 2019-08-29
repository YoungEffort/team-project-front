import React, { Component } from 'react';
import { Row, Col, Card, Icon  } from 'antd';
import { getTechstack,deleteTechstack } from '@/api/techBoard';
import './style.less'

class techBoard extends Component {
   constructor (props) {
      super(props);
      this.state = {
         data: []
      };
   }
   componentDidMount () {
      this.handleGetTechstack()
   }
   handleGetTechstack (){
      let params = { }
      getTechstack(params).then(res => {
         if (res.code === '200') {
            console.log(res.data);
            this.setState({ data: res.data });
         }
      });
   }
   handleDelete= (id) => {
      let params={ id:id }
      deleteTechstack(params).then(res => {
         if (res.code === '200') {
            this.handleGetTechstack()
            console.log(res.data)
         }
      })
   }
   render () {
      return (
         <div className = 'tech-board'>
            <Row gutter = { 16 }>
               { this.state.data.map((item,i) => 
                  <Col span = { 4 } key = { i } className = 'mrb-10'>
                     <Card style = { { width: '97%' } } hoverable>
                        <h3 className = 'mrb-5'>技术栈：{ item.tech }</h3>
                        <p className = 'mrb-5 cl1'>负责人：{ item.principal }</p>
                        <p className = 'mrb-5'>
                           <span className = 'cl2'>状态：{ item.state }...</span> 
                           <span className = 'card-footer right'>
                              <Icon type = 'edit' className = 'mrr-10' />
                              <Icon type = 'delete'  onClick = { () => this.handleDelete(item.id) } />
                           </span>
                        </p>
                     </Card>
                  </Col>
               ) }
            </Row>
         </div>
      );
   }
}

export default techBoard;
