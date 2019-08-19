/*
   context 多级组件 props传递
   秦国胜
   2019-08-19
*/
import React, { Component, createContext } from 'react'

let list = [
   { key: 0, text: '文本一' },
   { key: 1, text: '文本二' },
   { key: 2, text: '文本三' }
]
const { Provider, Consumer } = createContext(list);

// 孙子组件
class SubChilds extends Component {
    // 值渲染
    listView  = (value) => {
       return value.map((item) => {
          return (
             <li key = { item.key }>{ item.text }</li>
          )
       })
    }
    render () { 
       return (
          <div>
             <h4>这里是孙子组件</h4>
             <ul>
                <Consumer>
                   { value => this.listView(value) }
                </Consumer>
             </ul>
          </div>
       )
    }
}

// 子组件
class Childs extends Component {
   // 值渲染
   listView  = (value) => {
      return (
         <div>
            <ul>
               {
                  value.map((item) => {
                     return (
                        <li key = { item.key }>
                           { item.text }
                        </li>
                     )
                  })
               }
            </ul>
            <SubChilds />
         </div>
      )
     
   }
   render () { 
      return (
         <div>
            <h4>这里是子组件</h4>
            <ul>
               <Consumer>
                  { value => this.listView(value) }
               </Consumer> 
            </ul>
         </div>
      )
   }
}

// 父组件
class Parents extends Component {
   constructor ( props ) {
      super (props)
      this.state = {
         lists: [
            { key: 0, text: '新的文本一' },
            { key: 1, text: '新的文本二' },
            { key: 2, text: '新的文本三' } 
         ]
      }
   }
   render () {
      let { lists }  = this.state
      return (
         <div>
            <Provider value = { lists }>
               <Childs />
            </Provider>
         </div>
      )
   }
}
export default  Parents