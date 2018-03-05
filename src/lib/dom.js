import { type } from 'type'
import qrcode from 'qrcode-npm'

/*
 * dom操作类
 */
class Dom {
    /**
     * 创建Dom标签节点
     * @param {*} opt
     * opt.element
     * opt.attrs
     * opt.content
     * opt.outType
     * @param {*} callback
     */
    createNode (opt, callback) {
        const dataType = {
            'element': 'string',
            'attrs?': 'object',
            'content?': 'string',
            'outType?': 'string'
        }

        opt.content = opt.content || ''
        opt.attrs = opt.attrs || {}
        opt.outType = opt.outType || 'string'

        if (type.dataVerify(dataType, opt)) {
            const _node = document.createElement(opt.element)
            _node.innerHTML = opt.content

            if (type.getObjectType(opt.attrs) === 'object') {
                const _keys = Object.keys(opt.attrs)
                const _values = Object.values(opt.attrs)

                if (_keys.length > 0) {
                    for (let i = 0; i < _keys.length; i++) {
                        _node.setAttribute(_keys[i], _values[i])
                    }
                }
            }

            if (opt.outType === 'string') {
                const _pater = document.createElement('div')
                _pater.appendChild(_node)
                if (callback) {
                    callback(_pater.innerHTML)
                } else {
                    return _pater.innerHTML
                }
            } else {
                if (callback) {
                    callback(_node)
                } else {
                    return _node
                }
            }
        } else {
            console.error(type.dataVerify(dataType, opt))
        }
    }

    stringToNode (stringHtml) {
        const pater = document.createElement('div')
        pater.innerHTML = stringHtml
        return pater.childNodes
    }

    /**
     * 通过指定的元素id，插入文本
     * @param {string} elementId 元素的id
     * @param {string} content 待插入的文本
     */
    inner (elementId, content, callback) {
        const _element = document.getElementById(elementId)

        if (_element) {
            _element.innerHTML = content
        } else {
            console.error('dom element "' + elementId + '" is not found!')
        }

        callback && callback()
    }

    hasClass (node, className) {
        if (node) {
            if (typeof className === 'string') {
                const _class = node.getAttribute('class') || ''
                return _class.includes(className)
            } else {
                console.error('className type is not string!')
            }
        } else {
            if (console && console.trace) console.trace()
            console.error('dom element is not found!')
        }
    }

    replaceClass (node, repClaaaName, className) {
        if (node) {
            let _class = node.getAttribute('class') || ''
            _class = _class.replace(repClaaaName, className)
            node.setAttribute('class', _class)

            return this
        } else {
            if (console && console.trace) console.trace()
            console.error('dom element is not found!')
        }
    }

    addClass (node, className) {
        if (node && typeof className === 'string') {
            const _class = node.getAttribute('class') || ''
            const _classList = _class.split(/\s+/)
            if (!_class || _classList.indexOf(className) < 0) {
                _classList.push(className)
                node.setAttribute('class', _classList.join(' '))
            }
            return this
        } else {
            if (console && console.trace) console.trace()
            console.error('dom element is not found!')
        }
    }

    removeClass (node, className) {
        if (node && typeof className === 'string') {
            className = className.trim()
            const _class = node.getAttribute('class')
            const reg = new RegExp('\b' + className + '\b')
            let list = _class.split(/\s+/)
            let clsIndex = list.indexOf(className)
            if (clsIndex >= 0) {
                list.splice(clsIndex, 1)
            }
            node.setAttribute('class', list.join(' '))
            // if (_class.match(reg)) {
            //     node.setAttribute('class', _class.replace(reg, ''))
            // }

            return this
        } else {
            if (console && console.trace) console.trace()
            console.error('dom element is not found!')
        }
    }

    /**
     * @param {string} content
     * @param {number} size
     * @param {number} margin
     */
    qrCode (content, size, margin) {
        if (type.getObjectType(content) === 'string' && type.getObjectType(size) === 'number' && type.getObjectType(margin) === 'number') {
            let regExp = new RegExp('"' + (530 + margin * 2) + '"', 'g')
            let qr = qrcode.qrcode(9, 'Q')
            qr.addData(content)
            qr.make()

            return qr.createImgTag(10, margin).replace(regExp, size)
        } else {
            console.error('param type is error!')
        }
    }

    scrollBottom (node, callback) {
        window.onscroll = () => {
            if (node) {
                if (node.getScrollTop() + node.getWindowHeight() === node.getScrollHeight()) {
                    callback()
                }
            } else {
                window.onscroll = null
            }
        }
    }

    /**
     * 获取元素宽度或高度，对于width设置为auto或百分比的元素，部分浏览器在调用api获取其宽高时不返回计算值
     * @param {*} ele dom元素
     * @param {*string} name 样式名称
     */
    getWidthOrHeight  (ele, name) {
        if (name !== 'width' && name !== 'height') {
            return
        }
        if (ele.getBoundingClientRect) {
            let o = ele.getBoundingClientRect()
            return name === 'width' ? (o.right - o.left) : (o.bottom - o.top)
        } else {
            if (window.getComputedStyle) {
                return parseInt(window.getComputedStyle(ele, null)[name], 10)
            } else {
                return parseInt(ele.currentStyle[name], 10)
            }
        }
    }

    /**
     * 查找样式值方法
     */
    getComputedStyle (ele, styleName) {
        let result = ''
        if (window.getComputedStyle) {
            if (!styleName) {
                result = window.getComputedStyle(ele, null)
            } else {
                result = window.getComputedStyle(ele, null)[styleName]
            }
        } else if (ele.currentStyle) {
            if (!styleName) {
                result = ele.currentStyle
            } else {
                result = ele.currentStyle[styleName]
            }
        } else {
            result = ele.style[styleName]
        }
        return result
    }
}

export const dom = new Dom()
