import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import reducer from './Store/reducer' 
import { Storestate } from './Store/types'


import './index.css';
import App from './App';

// 原来会报错：window上不存在属性__REDUX_DEVTOOLS_EXTENSION__，
// 所以就全局声明一个变量
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__:any
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
