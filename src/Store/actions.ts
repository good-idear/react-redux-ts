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

