
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'

// 完成的状态
export interface doneState {
    content: string;
    date: string;
}

export interface Storestate {
    lastUpdated: number;
    todos: string[];    // 代办事项的数据
    done: doneState[];  // 已完成的数据
    undo: string[];     // 取消的事项
}

