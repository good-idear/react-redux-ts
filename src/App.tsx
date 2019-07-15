import React from 'react';
import {css} from "emotion";
import { todoListData } from './utils/metaTodoListData'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { Storestate } from './Store/types'
import { connect } from 'react-redux'

interface Props {
  lastUpdated:number;
  countList: number[];
}
interface State {

}
class App extends React.Component<Props, State>{
  constructor(props:Props){
    super(props)
  }
  render(){
    return(
      <div>
        <h1 className={styles.title}>TodoList</h1>
        <div className={styles.main}>
          <TodoInput />
          {todoListData.map((item, _index) => (
            <TodoList category={item} count={this.props.countList[_index]} key={_index} />
          ))}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state: Storestate) => {
  return {
    lastUpdated: state.lastUpdated,
    countList: [
      state.todos.length,
      state.done.length,
      state.undo.length,
    ]
  }
}
export default connect(mapStateToProps, null)(App);

const styles = {
  root: css`
    
  `,
  main: css`
    width: 100%;
    padding: 0 10px;
    max-width: 800px;
    margin: auto;
    box-sizing: border-box;
  `,
  title: css`
    background: #f39894;
    color: #fff;
    height: 64px;
    line-height: 64px;
    text-align: center;
    padding: 0;
    margin: 0;
    font-size: 2.3em;
  `
}
