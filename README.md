# React+redux+ts的代办事项

**这次也是模仿大佬的项目，大致上的东西差不多，主要是为了练习一下react,ts,redux,因为之前一致对数据流概念不太清楚，又接触到了typescript，所以就入坑了。大佬项目地址：**

[https://github.com/jackluson/todolist--redux-hook-react]: 

而且在网上有些类似项目太难了，对新手不够友好，所以我就尝试写了一下，也可以看作是对大佬项目的注释。

> 读这篇文章需要对`typescript`的声明和约束懂一些，`react`和`redux`都了解，不然步子太大也很难理解。

启动：
```shell
# 安装依赖包
yarn 
# 运行项目
yarn start
```

## 1. 创建项目

`./packahe.json`,这是项目的包的版本，读者直接下载我的配置文件直接安装也行，raect版本是16+的

```json
{
  "name": "my-app2",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/core": "^10.0.10",
    "@types/jest": "24.0.12",
    "@types/node": "12.0.0",
    "@types/react": "16.8.17",
    "@types/react-dom": "16.8.4",
    "@types/react-redux": "^7.0.9",
    "emotion": "^10.0.9",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-redux": "^7.0.3",
    "react-scripts": "3.0.1",
    "redux": "^4.0.1",
    "typescript": "3.4.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

菜鸟当然是使用脚手架咯！

```
# 全局安装ts
npm install -g typescript
# 全局安装create-react-app
npm install -g create-react-app
# 创建项目
create-react-app 项目名 --scripts-version=react-scripts-ts
# 启动项目
npm run start
```

注意：

- tsconfig.json包含了工程里TypeScript特定的选项。
- tslint.json保存了要使用的代码检查器的设置，TSLint。
- package.json包含了依赖，还有一些命令的快捷方式，如测试命令，预览命令和发布应用的命令。
- public包含了静态资源如HTML页面或图片。除了index.html文件外，其它的文件都可以删除。
- src包含了TypeScript和CSS源码。index.tsx是强制使用的入口文件。

> 安装全局的命令包我推荐使用`npm`，然后之后的安装其它包就使用`yarn`,`yarn` 下载包的速度更快。只要学习一下yarn的命令就行了。

## 2. 主要说明

### 2.1 使用`redux-tools`

> 需要先在浏览器上安装相应的react插件`Redux DevTools`,才有效

```tsc
// 原来会报错：window上不存在属性__REDUX_DEVTOOLS_EXTENSION__，
// 所以就全局声明一个变量
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__:any
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
// 这是根 state 的约束
export interface IRootState {
    demo: Storestate
}

const store = createStore<any, any, any,any>(reducer, composeEnhancers())

ReactDOM.render(
    <Provider store={store}>
       <App/> 
    </Provider>
    , 
    document.getElementById('root') as HTMLElement);

serviceWorker.unregister();
```

###  2.2 使用`redux`

- 使用`mapStateToProps`,是把`state`的数据当成`props`注入到相应组件中
- 使用`mapDispatchToProps`是把`dispatch`当成`props`注入组件中,可以通过`this.props.actionTodo`来调用该函数，进而触发`根store`的更新

```tsc
// 引入state的类型  第二个参数可以为null
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
// dispath的类型为Dispatch,需要引入类型 import { Dispatch } from 'redux'在头部
const mapDispatchToProps = (dispatch: Dispatch, ownProps: listProps) => {
    return {
        // 可以通过this.props.actionTodo来调用该函数，进而触发根store的更新
        actionTodo: (obj:Action1) => {
            dispatch(obj)
        },
        action2Todo: (obj:Action1) => {
            dispatch(obj)
        },
    }
}
// 如果只需要一个函数，另一个直接为null
//export default connect(null, mapDispatchToProps)(TodoItem)
export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)
```

### 2.3 `action.ts `

> 是用来规范函数的作用，以及传参给该函数进行调用。

- 传统写法

```js
/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```

- 骚操作

```tsx
// 当使用固定值时，是可以当作类型的，所以才这样混写
export type Action = 
    {
        type: "add todo";       // 增加待办事项
        todo: string;
    } | {
        type: "done todo";      // 已完成的待办事项
        index: number;
    } | {
        type: "cancel todo";    // 取消待办事项
        index: number;
    } | {
        type: "withdraw todo";
        index: number;
    } | {
        type: "delete todo";    // 删除事项
        index: number;
    } | {
        type: "restore todo";
        index: number;
    };

```

> 但是如果只是这样写的话，会报错：
>
> 不能将类型“string”分配给类型“"add todo" | "done todo" | "cancel todo" | "withdraw todo" | "delete todo" | "restore todo"
>
> 我的不知道为什么会报错，大佬就不会。

```tsx
//这里的Action1本来应该是Action，但是会报上面的错，
//所以需要在action.ts添加类型。
interface doListProps extends listProps {
    index: number;
    actionTodo:(obj:Action1)=>void; 
    action2Todo:(obj:Action1)=>void;
    //data: any;
}
```

完整的`action.ts`

```tsx
//这里有类型就ok了
export interface Action1{
    type: string;
    todo?:string;
    index?:number;
}
// 确定action的接口模式
export type Action = 
    {
        type: "add todo";       // 增加待办事项
        todo: string;
    } | {
        type: "done todo";      // 已完成的待办事项
        index: number;
    } | {
        type: "cancel todo";    // 取消待办事项
        index: number;
    } | {
        type: "withdraw todo";
        index: number;
    } | {
        type: "delete todo";    // 删除事项
        index: number;
    } | {
        type: "restore todo";
        index: number;
    };
```

### 2.3 `type.ts`

> 用来确定根store的类型，或者全局变量的类型

```tsx
// 完成的状态
export interface doneState {
    content: string;
    date: string;
}
// 这里的类型需要在index.tsx中使用
export interface Storestate {
    lastUpdated: number;
    todos: string[];    // 代办事项的数据
    done: doneState[];  // 已完成的数据
    undo: string[];     // 取消的事项
}
```

### 2.4 `reducer.ts`

```ts
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
```

注意：

- `splice`用法:

> 通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
//从第 2 位开始删除 0 个元素，插入“drum”
var removed = myFish.splice(2, 0, "drum");
//["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]

//从第 3 位开始删除 1 个元素
var removed = myFish.splice(3, 1);
//["angel", "clown", "mandarin"];
```

- `concat`用法：

> 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

```js
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

var nums = num1.concat(num2, num3);

console.log(nums); 
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 2.5 `utils/index.tsx`

> 用来放置一些需要使用的工具性函数，主要是处理数据

```ts
class TodoUtils {
    // 规定为一年有效期
    public storeAge: number = 366*24*60*60*1000

    // 判断本地数据是否为object，并且内容也为object的，使用toString方法可以查看出来
    typeObject(o:any):string {
        var s = Object.prototype.toString.call(o);
        // 匹配是否[object Object], 这里改成小写了
        // 这里会报错 对象可能为空的错误    
        // 解决办法：在tsconfig.ts文件中增加 --strictNullChecks，为false，则不启动对空类型的检查
        return s.match(/\[object (.*?)\]/)[1].toLowerCase()
      }

    // 存储本地事项
    setStoreItem(key: string, value: any) {
        localStorage.removeItem(key)
        let isObject: boolean = this.typeObject(value) == 'object'
        // 新添加的事项时间
        const _time = new Date().getTime();
        // 有效时长
        const _age = this.storeAge;
        // 如果不是对象，新建一个对象把value存起来
        if(!isObject){
            let b:any = value
            value = {}
            value._value = b
        }
        value._time = _time
        value._age = _time + _age
        value._isObject = isObject
        localStorage.setItem(key, JSON.stringify(value))
    }

    // 判断一个localStoreage是否过期
    isExpire(key: string):boolean{
        let Expire:boolean = true
        let value:any = localStorage.getItem(key)
        const now = new Date()
        if(value) {
            value = JSON.parse(value)
            Expire = now > value._age
        }else {

        }
        return Expire
    }
    // 获取相应的事项，并转成数组
    getStoreItem(key: string) {
        let Expire: boolean = this.isExpire(key)
        let value:any = null
        if(!Expire) { // 如果没有过期
            value = localStorage.getItem(key)
            value = JSON.parse(value)
            if(!value._isObject) {
                value = value._value
            }
        }
        return value
    }
    removeStoreItem(key: string) {
        localStorage.removeItem(key)
    }
    clearStore() {
        localStorage.clear()
    }
}
// 这里需要new一个对象
export const todoUtils: TodoUtils = new TodoUtils()
```

### 2.6 `jsx`的小感悟

> jsx真的很牛逼！

```js
// state取出的数据为
data:{
    todo:['好好'， '学习'],
    done:[
        {
            content:'吃饭'，
            date:121212
        }，
        {
        	content:'睡觉'，
            date:121212
        }
    ],
    undo:['hh','ww'],
    lastUpdated: lastUpdated
}

```

所以从state中拿数据还要处理一遍,所以还要在相应组件内使用该函数

```tsx
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
```

使用只需要`{ handleState(data,type) }`,自动调用。

### 2.7 `emotion和 @emotion/core`是不一样的

- 使用`@emotion/core`

```tsx
// 下面张的像注释的不能删除。删除就会报错
/** @jsx jsx */  
import React from "react";
import { css,jsx } from "@emotion/core";
import TodoItem from './TodoItem'
```

- 使用`emotion`

```tsx
import { css } from 'emotion'
```

## 3 .上传github，删不了node_modules

```shell
npm install rimraf -g
rimraf node_modules
```

参考文章：

<https://segmentfault.com/q/1010000002972327>

<https://juejin.im/post/5c81d10b5188257ee7275222>

