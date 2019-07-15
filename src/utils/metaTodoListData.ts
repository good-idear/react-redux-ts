// toodlist 各类型的基本数据 
export interface todoType{
    type: string;       // 事项类型
    action: string;     // 触发的行为函数
    action1?: string;   // 触发的行为函数
    title: string;      // 事项分类名字
    icon: string;       // 箭头样式
}

export const todoListData: todoType[] = [
    {
        type: "todo",
        title: "待办",
        action: "done",
        action1: "cancel",
        icon: "&#xe6ad",
    },
    {
        type: "done",
        title: "已办",
        action: "withdraw",
        icon: "&#xe6ae",
    },
    {
        type: "undo",
        title: "已取消",
        action: "restore",
        action1: "delete",
        icon: "&#xe639",
    }

]