/**
 * 全局变量对象，在模块中引入后用于各个模块见共享。
 * globalVars.setItem('item1.item2.item3.item4', '1')
 * console.log(globalVars.storage)
 * globalVars.setItem('item1.item2.item3.item4', '2')
 * console.log(globalVars.storage)
 * globalVars.removeItem('item1.item2.item4', '2')
 * console.log(globalVars.getItem('item5'))
 */
const _traverse = function (obj, key, ifCreateUndefinedKey) {
    if (typeof obj !== 'object' || typeof key !== 'string') {
        console.error('参数错误')
    }
    let keys = key.split('.')
    let target = obj
    let parent = target
    let cur
    while (keys.length) {
        cur = keys[0]
        keys.shift()
        if (!cur.trim()) {
            continue
        }
        if (!(cur in target)) {
            if (ifCreateUndefinedKey) {
                if (!keys.length) {
                    return {
                        val: undefined,
                        keyName: cur,
                        parent: target
                    }
                } else {
                    target[cur] = {}
                }
            } else {
                return
            }
        }
        parent = target
        target = target[cur]
    }
    return {
        val: target,
        keyName: cur,
        parent: parent
    }
}
class GlobalVars {
    constructor () {
        this.storage = {}
    }
    /**
     * 设置全局变量
     * setItem('item', 'value') => {item: value}
     * setItem('item1.item2.item3', 'value') => {item: {item2: {item3: 'value}}}
     * @param {*string} key
     * @param {*object} val
     */
    setItem (key, val) {
        if (typeof key !== 'string') {
            console.error('参数类型错误')
        } else {
            let info = _traverse(this.storage, key, true)
            info['parent'][info['keyName']] = val
        }
    }

    /**
     * 获得全局变量
     * @param {*string} key
     */
    getItem (key) {
        if (typeof key !== 'string') {
            console.error('参数类型错误')
        } else {
            let info = _traverse(this.storage, key, false)
            if (info) {
                return info['val']
            }
        }
    }

    /**
     * 移除全局变量
     * @param {*string} key
     */
    removeItem (key) {
        if (typeof key !== 'string') {
            console.error('参数类型错误')
        } else {
            let info = _traverse(this.storage, key, false)
            if (info) {
                delete info['parent'][info['keyName']]
            }
        }
    }
}
export const globalVars = new GlobalVars()
