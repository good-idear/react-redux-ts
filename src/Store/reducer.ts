import { Storestate, doneState } from './types'
import { Action } from './actions'
import { todoUtils } from '../utils/index'

// 获取当天的日期
export const getDate = () => {
    const date = new Date()
    const mouth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + mouth + '-' + day;
}
// 这里的state的需要一个初始值，下面代码中的 setStoreItem 需要 localStorage中的 todos
const initState: Storestate = {
    lastUpdated: todoUtils.getStoreItem("lastUpdated") || 0,
    todos: todoUtils.getStoreItem("todos") || [],
    done: todoUtils.getStoreItem("done") || [],
    undo:todoUtils.getStoreItem("undo") || []
}
const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case "add todo":
            todoUtils.setStoreItem("todos", state.todos.concat(action.todo))
            return {
                ...state,
                lastUpdated: Date.now(),
                todos: state.todos.concat(action.todo)
            }
        case "done todo": {
            const todos = state.todos.slice()
            let doneItem: doneState = {
                content: todos.splice(action.index, 1)[0],
                date: getDate()
            }
            state.done.push(doneItem)
            todoUtils.setStoreItem("todos", todos)
            todoUtils.setStoreItem("done", state.done)
            return {
                ...state,
                lastUpdated: Date.now(),
                todos,
                done: state.done
            }
        }
        case "cancel todo": {
            const todos = state.todos.slice()
            const delItem = todos.splice(action.index, 1)
            state.undo.push(delItem[0])
            todoUtils.setStoreItem("todos", todos)
            todoUtils.setStoreItem("undo", state.undo)
            return {
                ...state,
                lastUpdated: Date.now(),
                todos,
                undo: state.undo
            }
        }   
        case "withdraw todo": {
            const done = state.done.slice()
            const delItem = done.splice(action.index, 1)[0]
            state.todos.push(delItem.content)
            todoUtils.setStoreItem("done", done)
            todoUtils.setStoreItem("todos", state.todos)
            return {
                ...state,
                lastUpdated: Date.now(),
                done,
                todos: state.todos
            };
        }
        case "delete todo": {
            const undo = state.undo.slice()
            undo.splice(action.index, 1)
            todoUtils.setStoreItem("undo", undo)
            return {
                ...state,
                lastUpdated: Date.now(),
                undo
            };
        }
        case "restore todo": {
            const undo = state.undo.slice();
            const delItem = undo.splice(action.index, 1);
            state.todos.push(delItem[0]);
            todoUtils.setStoreItem("undo",undo);
            todoUtils.setStoreItem("todos",state.todos);
            return {
              ...state,
              lastUpdated: Date.now(),
              undo,
              todos: state.todos
            };
        }
        default:
            return state
    }
}
export default reducer