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
        let isObject: boolean = this.typeObject(value) === 'object'
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

export const todoUtils: TodoUtils = new TodoUtils()