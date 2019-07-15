import { css } from 'emotion'
import React from 'react'
import { Storestate } from '../Store/types'
import { listProps } from './TodoList'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'
import {Action1} from '../Store/actions'

// 继承接口 合并接口
interface doListProps extends listProps {
    index: number;
    actionTodo:(obj:Action1)=>void;
    action2Todo:(obj:Action1)=>void;
    //data: any;
}
interface doListProps{
  data:any
}
// 处理 state 中的数据
function handleState(data:any[],type:string):string{
  // item 是遍历的对象属性值
  for(let item in data){
    //return item
    if(item === type && type==='todo'){
      return data[item]
    }else if(item===type && type==='done'){
      let doneList:any[]=data[item]
      let handledoneList :any = []
      for(let i=0; i < doneList.length;i++){
        handledoneList.push(doneList[i].content) 
      }
      return handledoneList
    }else if(item===type && type==='undo'){
      return data[item]
    }
  }
}
// 处理时间戳
function handleTime(time:number):string{
  let date = new Date(time)
  let Month = date.getMonth()+1
  let data:string = date.getFullYear()+'-'+Month+'-'+date.getDay()
  return data
}

class TodoItem extends React.Component<doListProps> {
    constructor(props: doListProps){
        super(props)
    }
    render(){
        return(
            <li className={styles.root}>
                <i 
                    className={styles.icon}
                    onClick={() => this.props.actionTodo({
                      type:  this.props.action + " todo",
                      index: this.props.index
                    })}
                    >
                </i>
                <span>
                  {handleState(this.props.data, this.props.type).length>0 ? 
                   handleState(this.props.data, this.props.type)[this.props.index]:null}
                </span>
                {this.props.action1 ? (
                  <button onClick={()=> this.props.action2Todo({
                    type:this.props.action1+' todo',
                    index: this.props.index
                  })}>
                    {this.props.type === "todo" ? "cancel" : "delete"}
                  </button>
                ) : (
                  <span className={styles.timeSpan}>{handleTime(this.props.data.lastUpdated)}</span>
                )}
            </li>
        )
    }
}
const mapStateToProps = (state: Storestate, ownProps: listProps) => {
  let data = {
    todo:state.todos || [],
    done:state.done || [],
    undo:state.undo || [],
    lastUpdated: state.lastUpdated
  }
  
  //console.log(data)
    return{
      data:data
    }
  
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps: listProps) => {
    return {
        actionTodo: (obj:Action1) => {
            dispatch(obj)
        },
        action2Todo: (obj:Action1) => {
            dispatch(obj)
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)

const styles = {
    root: css`
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      margin: 0;
      padding: 8px 12px;
      min-height: 44px;
      position: relative;
      min-height: 44px;
      line-height: 25px;
      padding: 10px 100px 10px 50px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      color: #373e40;
      &:hover {
        background-color: #efefef;
      }
      i {
        position: absolute;
        left: 15px;
        top: 10px;
        font-size: 24px;
        color: #f1c40f;
        font-weight: bolder;
        cursor: pointer;
      }
      button {
        position: absolute;
        right: 10px;
        top: 7px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        padding: 0;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #666;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          border: 1px solid #f39894;
          color: #f39894;
        }
      }
    `,
    timeSpan: css`
      position: absolute;
      right: 10px;
      top: 0;
      line-height: 44px;
      font-size: 12px;
      color: #aaa;
    `,
    icon: css`
      width:20px;
      height:20px;
      background:red;
    `
  };
