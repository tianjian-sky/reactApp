import { type } from 'type'
import axios from 'axios'
import { appAlert } from 'appAlert'
import * as config from 'config'
import { login } from 'login'
import { logServerError } from 'utils'

const getToken = Symbol('getToken')

class Http {
    request (obj) {
        const dataType = { 'method': 'string', 'url': 'string', 'opt?': 'object', 'type?': 'string' }
        // const macAddress = window.localStorage.getItem('macAddress')
        let promise = null
        const headers = {
            'Accept': 'application/vnd.dajiazhongyi+json, application/json; version=' + config.appVersion,
            'request-app-id': 'SAO/' + config.appVersion + ' (pc/client; mac/OSX) com.dajiazhongyi.pc/' + config.appCode,
            'Authorization': this[getToken](),
            'Pragma': 'no-cache'
        }
        if (type.dataVerify(dataType, obj)) {
            const _method = obj.method.toUpperCase()
            let _url = config.apiBase + obj.url
            // if (envMode === 'dev') {
            //     _url = obj.type === undefined ? 'studio/' + obj.url : 'api/' + obj.url
            // } else {
            //     _url = obj.type === undefined ? this.studioHost + obj.url : this.phpHost + obj.url
            // }
            switch (_method) {
            case 'GET':
                // ie get请求 缓存
                if (!obj.opt) obj.opt = {}
                Object.assign(obj.opt, {t: Math.random()})
                promise = axios.get(_url, { params: obj.opt, headers: headers, withCredentials: true })
                break
            case 'POST':
                promise = axios.post(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'PUT':
                promise = axios.put(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'DELETE':
                obj.opt.headers = headers
                promise = axios.delete(_url, obj.opt)
                break
            case 'PATCH':
                promise = axios.patch(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'ALL':
                promise = axios.all(_url, { headers: headers, withCredentials: true })
            }

            // 全局网络请求异常处理
            promise.catch((err) => {
                // 接口返回invalid auth token错误，强制退出
                try {
                    if (err.response.data.error.message.indexOf('invalid auth token') >= 0 || err.response.data.status === 401) {
                        logServerError(err)
                        appAlert.showAbnormal({
                            msg: '验证信息已经过期，请重新登录'
                        }, () => {
                            login.quitAppForce()
                        })
                    }
                } catch (ex) {
                }
            })
            return promise
        } else {
            return false
        }
    }
  
    // method: this.method,
    // url: this.url,
    // opt: opt
    phpRequest (obj) {
        const dataType = { 'method': 'string', 'url': 'string', 'opt?': 'object', 'type?': 'string' }
        // const macAddress = window.localStorage.getItem('macAddress')
        let promise = null
        const headers = {
            'Authorization': this[getToken](),
            'Proxyurl': obj.url,
        }
        if (type.dataVerify(dataType, obj)) {
            let _url = config.apiPhpBase
            const _method = obj.method.toUpperCase()
            switch (_method) {
            case 'GET':
                // ie get请求 缓存
                if (!obj.opt) obj.opt = {}
                Object.assign(obj.opt, {t: Math.random()})
                promise = axios.get(_url, { params: obj.opt, headers: headers, withCredentials: true })
                break
            case 'POST':
                promise = axios.post(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'PUT':
                promise = axios.put(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'DELETE':
                obj.opt.headers = headers
                promise = axios.delete(_url, obj.opt)
                break
            case 'PATCH':
                promise = axios.patch(_url, obj.opt, { headers: headers, withCredentials: true })
                break
            case 'ALL':
                promise = axios.all(_url, { headers: headers, withCredentials: true })
            }

            // 全局网络请求异常处理
            promise.catch((err) => {
                // 接口返回invalid auth token错误，强制退出
                try {
                    if (err.response.data.error.message.indexOf('invalid auth token') >= 0 || err.response.data.status === 401) {
                        logServerError(err)
                        appAlert.showAbnormal({
                            msg: '验证信息已经过期，请重新登录'
                        }, () => {
                            login.quitAppForce()
                        })
                    }
                } catch (ex) {
                }
            })
            return promise
        } else {
            return false
        }
    }


    response (responseData, by) {
        by = by || 'value'
        const byKeys = ['code', 'value']
        const dataType = { 'by?': 'string', 'responseData': 'object' }

        if (type.dataVerify(dataType, { by: by, responseData: responseData }) && byKeys.includes(by)) {
            if (by === 'code') {
                return responseData.status
            } else {
                if (responseData.status === 200) {
                    return responseData.data
                } else {
                    return false
                }
            }
        } else {
            console.error('http.response param type is error')
            return false
        }
    }

    [getToken] () {
        return window.sessionStorage.getItem('token')
        // const tokenData = JSON.parse(window.sessionStorage.getItem('token'))
        // return tokenData ? tokenData.auth_token : ''
    }

    // [verifyMethod] (method) {
    //     return this.method.includes(method.toUpperCase()) ? method.toUpperCase() : false
    // }

    getTimestamp (time) {
        return new Date().getTime() + time
    }
}

export const http = new Http()
