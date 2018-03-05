/**
 * 打印错误信息（基于服务端返回的标准格式）
 * @param {* object} err axios封装东错误信息
 * @param {* string} text 自定义错误信息
 */
export function logServerError (err, text) {
    if (err) {
        let errorText = `服务器端报错信息：
        状态码：${err.response.data.status}
        错误信息：${err.response.data.error.message}
        异常信息：${err.response.data.exception}`
        if (text) {
            errorText += '\n' + text
        }
        console.error(errorText)
    }
}

/**
* 返回一个字符串中的文字长度
* @param {*} para
*/
export function getCharLen (para) {
    let num = 0
    let reMandarain = /[^\u4e00-\u9fa5]/
    let reNoneMandarin = /\S/
    if (typeof para === 'string') {
        for (let i = 0; i < para.length; i++) {
            if (reMandarain.test(para.charAt(i))) num++
            else if (reNoneMandarin.test(reNoneMandarin)) num += 0.5
        }
    }
    return Math.floor(num)
}

/**
 * 判断是否是mac系统
 */
export function isMac () {
    return !!(detectOS() === 'Mac')
}

/** 
* 判断是否ie
*/
export function isIe () {
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('msie') >= 0 || 'ActiveXObject' in window) {
        return true
    } else {
        return false
    }
}

/**
* 判断是否是mac os操作系统
* @param {*} para
*/
export function detectOS () {
    var sUserAgent = navigator.userAgent
    var isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Win64') || (navigator.platform === 'Windows')
    var isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel')
    if (isMac) return 'Mac'
    var isUnix = (navigator.platform === 'X11') && !isWin && !isMac
    if (isUnix) return 'Unix'
    var isLinux = (String(navigator.platform).indexOf('Linux') > -1)
    if (isLinux) return 'Linux'
    if (isWin) {
        var isWin2K = sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1
        if (isWin2K) return 'Win2000'
        var isWinXP = sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1
        if (isWinXP) return 'WinXP'
        var isWin2003 = sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1
        if (isWin2003) return 'Win2003'
        var isWinVista = sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1
        if (isWinVista) return 'WinVista'
        var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1
        if (isWin7) return 'Win7'
    }
    return 'other'
}
