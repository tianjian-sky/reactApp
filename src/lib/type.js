/*
 * @Author: Kevin.Ren
 * @Date: 2017-08-19 08:46:36
 * @Last Modified by: Kevin.Ren
 * @Last Modified time: 2017-11-22 09:31:51
 */

class Type {
    /** 参数是否为数组 */
    isArray (object) {
        return Array.isArray(object)
    }

    /** 参数是否为对象 */
    isJson (obj) {
        if (typeof obj === 'object') {
            if (this.isArray(obj)) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    /**
     * 获取参数的数据类型
     * @param {any} object
     */
    getObjectType (object) {
        if (object === undefined) {
            return ''
        }

        if (object === null) {
            // return 'object'
            return 'null'
        }

        if (typeof object === 'object' && !object.constructor) {
            return 'object'
        }

        const funcNameRegex = /function ([^(]*)/
        const results = (funcNameRegex).exec((object).constructor.toString())

        if (results && results.length > 1) {
            return results[1].toLowerCase()
        } else {
            return ''
        }
    }

    /** 参数是否为空对象或空数组
     * @param {any} subObj
     * @retrun {boolean}
     */
    isEmptyObject (subObj) {
        if (typeof subObj === 'object') {
            if (this.isArray(subObj)) {
                if (subObj.length > 0) {
                    return false
                } else {
                    return true
                }
            } else {
                let hasProp = false

                for (let prop in subObj) {
                    prop = [prop]
                    hasProp = true
                    break
                }

                if (hasProp) {
                    return false
                } else {
                    return true
                }
            }
        } else {
            console.error('"' + subObj + '" type is not [object/json] or [array]!')
        }
    }

    /**
     * 获取URL中的query参数
     * @param {string} queryString
     */
    getParam (queryString) {
        let [ret, x] = [{}]

        if (typeof queryString === 'string' && queryString.includes('=')) {
            var list = queryString.split('&')
            list.forEach((item) => {
                x = item.split('=')
                ret[x[0]] = x[1]
            })
        } else {
            console.error('param type is not String or param is not a url query')
        }

        return ret
    }

    /** 获取对象的key值数组
     * @param {object/json} jsonObj
     * @return {array}
     */
    getJsonKeys (jsonObj) {
        if (this.isJson(jsonObj)) {
            let _keys = []

            if (!this.isEmptyObject(jsonObj)) {
                for (let _key in jsonObj) {
                    _keys.push(_key)
                }

                return _keys
            } else {
                return _keys
            }
        } else {
            console.log('param type error')
        }
    }

    /**
     * 对参数进行验证
     * 如果入参中有 reason 参数，那么返回一个对象。没有 reason 参数，直接返回boolean类型值
     *
     * 不带第三个参数 reason 的返回值
     * true / false
     *
     * 带有第三个参数 reason 的返回值结构
     * {
     *    result: false/true
     *    reason: {
     *        position: 0      // 对象key数组的索引指针
     *        key: 'string'    // 对象key的名称
     *        err: 0/1         // 该key的错误类型 ==> 0(参数类型错误), 1(缺少参数)
     *    }
     * }
     *
     * @param {object} typeDefine
     * @param {object} data
     * @param {boolean} reason
     *
     * type.dataVerify(typeDefine, data)
     *
     * @example
     * const typeDefine = { 'name': 'string', 'age': 'number', 'favorite': 'string|array', 'partisan?': 'string' }
     *
     * const data = { name: 'kevin', age: 40, favorite: ['football', 'boxing'], partisan: 'none' } ==> true
     * const data = { name: 'kevin', age: 40, favorite: 'boxing' } ==> true
     *
     * const data = { name: 'kevin', age: '10', favorite: 'football', partisan: 'none' } ==> false
     * const data = { name: 'kevin', favorite: 'football', partisan: 'none' } ==> false
     */
    dataVerify (typeDefine, data, reason) {
        if (!this.isEmptyObject(typeDefine) && !this.isEmptyObject(data)) {
            const _defineKeys = this.getJsonKeys(typeDefine)

            let _propStatus = true
            let _reason = {}

            for (let i = 0; i < _defineKeys.length; i++) {
                if (!_defineKeys[i].includes('?')) {
                    if (data.hasOwnProperty(_defineKeys[i])) {
                        if (typeDefine[_defineKeys[i]].includes('|')) {
                            if (!typeDefine[_defineKeys[i]].includes(this.getObjectType(data[_defineKeys[i]]))) {
                                _propStatus = false
                                _reason = makeReason(_defineKeys, i, 0)
                                break
                            }
                        } else {
                            if (this.getObjectType(data[_defineKeys[i]]) !== typeDefine[_defineKeys[i]]) {
                                _propStatus = false
                                _reason = makeReason(_defineKeys, i, 0)
                                break
                            }
                        }
                    } else {
                        _propStatus = false
                        _reason = makeReason(_defineKeys, i, 1)
                        break
                    }
                } else {
                    const _defineKey = _defineKeys[i].replace('?', '')
                    if (data.hasOwnProperty(_defineKey)) {
                        if (this.getObjectType(data[_defineKey]) !== typeDefine[_defineKeys[i]]) {
                            _propStatus = false
                            _reason = makeReason(_defineKeys, i, 0)
                            break
                        }
                    }
                }
            }

            return reason ? { result: _propStatus, reason: _reason } : _propStatus
        } else {
            console.error('param json is empty!')
        }

        function makeReason (keys, index, errType) {
            return {
                position: index,
                key: keys[index],
                err: errType
            }
        }
    }

    isInt (value) {
        const z = /^[0-9]*[1-9][0-9]*$/
        return z.test(value)
    }

    isMobileNumber (number) {
        return (/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test((+number))) && (number.toString().length === 11)
    }
}

export const type = new Type()
