import { type } from 'type'
import addEventListener from 'add-dom-event-listener'

const closeOther = Symbol('closeOther')
const verifyObj = Symbol('verifyObj')

class Act {
    constructor () {
        window.djzyEvents = {}
        this.floorList = []
    }

    set floor (elementId) {
        if (typeof elementId === 'string') {
            if (!this.floorList.includes(elementId)) {
                this.floorList.push(elementId)
            }
        } else {
            console.error('floorList参数不是字符类型')
        }
    }

    get floor () {
        return this.floorList
    }

    listener () {
        let body = document.getElementsByTagName('body')[0]
        addEventListener(body, 'click', (e) => {
            let tarID = e.target.getAttribute('id')
            this[closeOther]()
            if (tarID) {
                console.info('%c ' + tarID, 'color: #ff8611')
                if (tarID.indexOf('-') > 0) {
                    var eventIds = tarID.split('-')
                    if (window.djzyEvents.hasOwnProperty(eventIds[0] + '-')) {
                        window.djzyEvents[eventIds[0] + '-'](eventIds[1])
                    }
                } else {
                    if (window.djzyEvents.hasOwnProperty(tarID)) {
                        window.djzyEvents[tarID]()
                    }
                }
            }
        }, false)
    }

    /** 设置点击时隐藏指定的层
     * elements {array}
     *
     * element数据结构示例: const floors = [ 'showResult,inputId', 'showInfo' ]
     * floors为一个字符串数组
     * 1. 字符串中带有逗号的，逗号前表示需要关闭的元素ID，逗号后表示需要清空的输入框ID
     * 2. 如字符串中没有逗号，则字符串仅表示为需要关闭的元素ID
     */
    setFloor (elements) {
        if (type.isArray(elements)) {
            for (let i = 0; i < elements.length; i++) {
                this.floor = elements[i]
            }
        } else {
            console.error('setFloor入参类型不是数组')
        }
    }

    [closeOther] () {
        for (let i = 0; i < this.floor.length; i++) {
            if (this.floor[i].includes(',')) {
                const _floor = this.floor[i].split(',')
                const node = document.getElementById(_floor[0])
                if (node && node.style.display === 'block') node.style.display = 'none'
                const inputNode = document.getElementById(_floor[1])
                inputNode && (inputNode.value = '')
            } else {
                document.getElementById(this.floor[i]) && (document.getElementById(this.floor[i]).style.display = 'none')
            }
        }
    }

    addEvent (eventObj) {
        if (this[verifyObj](eventObj)) {
            if (type.isArray(eventObj.eventId)) {
                for (let i = 0; i < eventObj.eventId.length; i++) {
                    this.bindEvent(eventObj.eventId[i], eventObj.eventFn)
                }
            } else {
                this.bindEvent(eventObj.eventId, eventObj.eventFn)
            }
        }
    }

    bindEvent (eventId, eventFn) {
        if (!window.djzyEvents.hasOwnProperty(eventId)) {
            window.djzyEvents[eventId] = eventFn
        }
    }

    inputChange (element, fn) {
        if (element) {
            addEventListener(element, 'change', fn)
        }
    }

    onInput (element, fn) {
        // ie9 contentedtable div 无法触发oninput事件
        // ie8 不支持oninput
        // ie9 oninput事件不监听删除动作
        if (element) {
            addEventListener(element, 'keyup', fn) // 兼容ie8
            // window.alert(typeof element.oninput === 'object')
            // if (typeof element.oninput === 'object') {
            //     addEventListener(element, 'input', fn)
            // } else {
            //     addEventListener(element, 'keyup', fn) // 兼容ie8
            // }
        }
    }

    onFocus (element, fn) {
        if (element) {
            addEventListener(element, 'focus', fn)
        }
    }

    onBlur (element, fn) {
        if (element) {
            addEventListener(element, 'blur', fn)
        }
    }

    onScroll (element, fn) {
        if (element) {
            addEventListener(element, 'scroll', fn)
        }
    }

    onMouseenter (element, fn) {
        if (element) {
            addEventListener(element, 'mouseenter', fn)
        }
    }

    onMouseleave (element, fn) {
        if (element) {
            addEventListener(element, 'mouseleave', fn)
        }
    }

    [verifyObj] (eventObj) {
        const typeDefine = { 'eventId': 'string|array', 'eventFn': 'function' }

        if (type.dataVerify(typeDefine, eventObj)) {
            return true
        } else {
            console.error('数据验证不合法，请检查参数的类型或参数的属性是否缺少', eventObj)
            return false
        }
    }
}

export const act = new Act()
