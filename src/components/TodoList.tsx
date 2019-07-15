/** @jsx jsx */
import React from "react";
import { css,jsx } from "@emotion/core";
import TodoItem from './TodoItem'

export interface listProps{
    type: string;
    action: string;
    action1?: string | undefined;
    title?: string;
    icon: string;
}
interface State {
    isCollapse: boolean;
}
interface Props {
    category: listProps;
    count: number;
}
export default class TodoList extends React.Component<Props, State>{
    private myRef: React.RefObject<HTMLDivElement>
    constructor(props:Props){
        super(props)
        //console.log(props)
        this.myRef = React.createRef()
        this.state = {
            isCollapse: true,
        }
    }
    componentDidMount() {
        
    }
    toggleCollapse = () => {
        let ulElement: HTMLDivElement | null = this.myRef.current;
        let show: string = this.state.isCollapse ? "block": "none"
        const ulHeight: string = this.state.isCollapse ? "auto": "0px";
        if (ulElement){
        let ulEleChild:any = ulElement.children[0];
        //console.log(ulEleChild)
        ulElement.style.display = show;
        if(this.state.isCollapse){
            ulElement.style.height = ulEleChild.offsetHeight + "px";
        }
        setTimeout(()=>{
            if(ulElement){
            ulElement.style.height = ulHeight;
            }
        }, 300)
        }
        let isCollapse = !this.state.isCollapse;
        this.setState({ isCollapse });
    }
    render(){
        return(
            <div>
                <h5 css={styles.title} onClick={this.toggleCollapse}>
                    {this.props.category.title}
                    <span>
                        {this.props.count}  
                    </span>
                    <i
                        className={
                        this.state.isCollapse ? "iconfont" : "iconfont close-span"
                        }
                        css={styles.rotateCollapsed}
                    >
                        &#xe621;
                    </i>
                </h5>
                <div 
                    ref={ this.myRef }
                    className= "list-box collapsed"
                    css={styles.unCollapsed}
                    >
                    <ul>
                        {
                            new Array(this.props.count).fill(null).map((item, index) => {
                                return <TodoItem
                                    index={index}
                                    key={index}
                                    type={this.props.category.type}
                                    icon={this.props.category.icon}
                                    action={this.props.category.action}
                                    action1={this.props.category.action1}
                                />
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
const styles = {
    title: css`
      position: relative;
      height: 44px;
      line-height: 44px;
      padding-left: 20px;
      border-bottom: 1.5px solid #fff;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      background: #f39894;
      font-size: 16px;
      span {
        display: inline-block;
        margin-left: 5px;
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-radius: 50%;
        line-height: 21px;
        text-align: center;
        font-size: 14px;
      }
    `,
    count: css`
      font-size: 12px;
    `,
    collapsed: css`
      display: block;
      height: auto;
    `,
    unCollapsed: css`
      height: 0;
      display: none;
    `,
    rotateCollapsed: css`
      display: inline-block;
      transform: rotate(0deg);
      transition: transform 0.3s;
      position: absolute;
      right: 20px;
      top: 0;
      font-size: 20px;
      &.close-span {
        transform: rotate(90deg);
      }
    `
  };