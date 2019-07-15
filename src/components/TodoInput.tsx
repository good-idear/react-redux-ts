import React from 'react'
import { css } from "emotion";
import {Action} from '../Store/actions'
import {connect} from 'react-redux'
import { Dispatch } from 'redux'

interface IProps {
    addDispatch:(obj:Action)=>void
}
interface IState {
    text: string;
}
class TodoInput extends React.Component<IProps,IState>{
    constructor(props: IProps){
        super(props)
        this.state = {
            text: '',
        }
    }
    // 存储获取的输入框值
    setNewTodo = (value: string)=>{
        this.setState({
            text: value
        })
    }
    render(){
        return(
            <div className={styles.root}>
                <input 
                    className={styles.input}
                    type="text"
                    value={this.state.text}
                    onChange={e=> this.setNewTodo(e.target.value)}
                    onKeyDown={e => {
                        if(e.key === 'Enter' && this.state.text.trim().length > 0){
                            this.setNewTodo('')
                            this.props.addDispatch({
                                type: "add todo",
                                todo: this.state.text
                            })
                        }
                    }}
                    />
                <button
                    className={styles.addButton}
                    onClick={ e =>{
                        if(this.state.text.trim().length > 0){
                            this.setNewTodo("")
                            this.props.addDispatch({
                                type: "add todo",
                                todo: this.state.text
                            })
                        }
                    }}
                >Add</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addDispatch: (obj:Action) => {
            dispatch(obj)
        }
    }
}
export default connect(null,mapDispatchToProps)(TodoInput)
const styles = {
    root: css`
        position: relative;
        padding: 30px 90px 30px 0;
        font-size: 16px;
    `,
    input: css`
        width: 100%;
        height: 40px;
        padding: 7px 10px;
        line-height: 26px;
        border: 1px solid #c0ccda;
        border-radius: 4px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        box-sizing: border-box;
        font-size: inherit;
        outline: none;
        &:focus {
        border: 1px solid #f39894;
        }
    `,
    addButton: css`
        position: absolute;
        right: 0;
        top: 30px;
        width: 80px;
        height: 40px;
        line-height: 26px;
        color: #fff;
        transition: background 0.3s ease-in;
        padding: 7px 0;
        outline: none;
        text-align: center;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        border: 1px solid #f39894;
        background: #f39894;
        &:hover {
        background: #d77672;
        }
  `,

}