import { Type } from 'type'

const hashAnalysis = Symbol('hashAnalysis')
const findHashIndex = Symbol('findHashIndex')

/**
 * 页面级的路由模块
 */
export class Router extends Type {
    constructor (routers) {
        super()
        this.globalRouters = routers
    }

    /**
     * 路由初始化，执行监听hash监听
     */
    listener () {
        window.addEventListener('load', this.actRouter.bind(this), false)
        window.addEventListener('hashchange', this.actRouter.bind(this), false)
    }

    /**
     * 创建路由
     * @param {object} routerOjb
     */
    updateRouter (routerOjb) {
        let _router = this.globalRouters
        const verifyObj = { 'hash': 'string', 'action': 'function', 'animation?': 'function' }

        if (this.dataVerify(verifyObj, routerOjb)) {
            if (this.globalRouters.hasOwnProperty(routerOjb.hash)) {
                console.warn(routerOjb.hash + ' already exists')
            } else {
                _router.push(routerOjb)
                this.globalRouters = _router
            }
        } else {
            console.error('param type error or miss property { hash, action }')
        }
    }

    /**
     * 执行路由事件
     */
    actRouter () {
        const _hashObj = this[hashAnalysis](window.location.hash)
        const _index = this[findHashIndex](_hashObj.hash)
        if (_index > -1) {
            if (_hashObj.hasOwnProperty('query')) {
                this.globalRouters[_index]['action'](_hashObj.query)
            } else {
                this.globalRouters[_index]['action']()
            }
        } else {
            console.error('"' + _hashObj.hash + '" is not router')
        }
    }

    /**
     * 解析Hash
     * [private]
     * @param {string} hashString
     * @reture { hash: string [, query: json] }
     */
    [hashAnalysis] (hashString) {
        if (hashString === '') {
            hashString = '#/'
        }

        if (hashString.includes('#/')) {
            hashString = hashString.replace('#/', '')

            if (hashString.includes('?')) {
                const _hashArray = hashString.split('?')
                return {
                    hash: _hashArray[0],
                    query: this.getParam(_hashArray[1])
                }
            } else {
                return {
                    hash: hashString
                }
            }
        } else {
            console.error('param is not a url hash')
        }
    }

    /**
     * [private]
     * @param {sting} routerString
     * @return {number} -1 => not found
     */
    [findHashIndex] (routerString) {
        const _routerObj = this.globalRouters
        let _index = -1

        for (let i = 0; i < _routerObj.length; i++) {
            if (_routerObj[i]['hash'] === routerString) {
                _index = i
            }
        }

        return _index
    }
}
