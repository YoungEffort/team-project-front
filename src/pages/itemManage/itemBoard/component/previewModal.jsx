// 预览弹窗
import React, { Component } from 'react'
import { Modal, Icon } from 'antd';

export default class previewModal extends Component {
   constructor (props) {
      super(props);
      this.state = {
         modalInit: {
            title: '测试预览',
            width: 430,
            wrapClassName: 'item-board-preview-modal'
         }
      }
   }
   render () {
      let { modalInit } = this.state
      let { previewModalVisible } = this.props
      return (
         <Modal 
            { ...modalInit }
            visible = { previewModalVisible }
         >
            <ul className = 'preview-container'>
               <li className = 'preview-content preview-content-1 f-c'>
                  <h5 className = 'preview-title f-l'>测试预览</h5>
                  <div className = 'preview-detail f-r'>
                     <div className = 'preview-detail-item f-l'>
                        <div className = 'preview-detail-icon'>
                           <Icon type = 'eye' />
                        </div>
                        <p>预览一</p>
                     </div>
                     <div className = 'preview-detail-item f-l'>
                        <Icon type = 'project' />
                        <p>预览二</p>
                     </div>
                     <div className = 'preview-detail-item f-l'>
                        <Icon type = 'qrcode' />
                        <p>预览三</p>
                     </div>
                    
                  </div>
               </li>
               <li className = 'preview-content f-c'>
                  <h5 className = 'preview-title f-l'>仓库地址</h5>
                  <div className = 'preview-detail f-r'>
                     <Icon type = 'bank' />
                     <Icon type = 'code' />
                  </div>
               </li>
            </ul>
         </Modal>
      )
   }
}
