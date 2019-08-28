import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import { getTechstack } from '@/api/techBoard';
import './style.less';

class techBoard extends Component {
   constructor (props) {
      super(props);
      this.state = {
         data: []
      };
   }
   componentDidMount () {
      let params = {};
      getTechstack(params).then(res => {
         if (res.code === '200') {
            console.log(res.data);
            this.setState({ data: res.data });
         }
      });
   }
   render () {
      return (
         <div className = 'tech-board'>
            <Row gutter = { 16 }>
               { this.state.data.map((item, i) => (
                  <Col span = { 3 } key = { i } className = 'mrb-10'>
                     <Card style = { { width: 200 } } hoverable>
                        <h3 className = 'mrb-5'>技术栈：{ item.tech }</h3>
                        <p className = 'mrb-5 cl1'>负责人：{ item.principal }</p>
                        <p className = 'cl2'>状态：{ item.state }...</p>
                     </Card>
                  </Col>
               )) }
            </Row>
         </div>
      );
   }
}

export default techBoard;
