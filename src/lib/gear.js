/**
 * 患者年龄对应关系 (month => year)
 *  month = 10  ==>   '10个月'
 *  month = 25  ==>   '2岁'
 *
 * @param month
 * @returns {*}
 */
export function age (month, type) {
    let ret = ''

    if (month) {
        const year = Math.floor(month / 12)

        if (year === 0) {
            ret = month + '个月'
        } else {
            ret = year + '岁'
        }
    }

    return ret
}

export function gender (gender) {
    switch (gender) {
    case 1:
        return '男'
    case 2:
        return '女'
    default:
        return ''
    }
}

/** 资质说明 */
export function getVerifyTitle (verifyStatus, verifyType, verifyOccupation, verifyTitle) {
    let _verifyTypeName = getVerifyTypeAlias(verifyStatus.toString(), verifyType.toString())

    switch (_verifyTypeName) {
    case '医师认证':
        return verifyTitle === null ? verifyOccupation : verifyTitle
    case '从业人员资格认证':
        return verifyOccupation + '(从业人员)'
    case '医学院师生认证':
        return '(医学院师生)'
    case '实名认证':
        return verifyOccupation + '(实名认证)'
    case '未认证':
        return '(未认证)'
    default:
        return ''
    }
}

/**
 * 认证类型
 * @verifyStatus 认证状态
 * @verifyType 认证类型
 */
export function getVerifyTypeAlias (verifyStatus, verifyType) {
    let ret = ''

    if (verifyStatus !== '2') {
        ret = '未认证'
    } else {
        if (verifyType === '1' || verifyType === '2') {
            ret = '医师认证'
        } else if (verifyType === '3') {
            ret = '从业人员资格认证'
        } else if (verifyType === '4') {
            ret = '医学院师生认证'
        } else if (verifyType === '7') {
            ret = '实名认证'
        }
    }

    return ret
}

export function random (number) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let res = ''
    for (let i = 0; i < number; i++) {
        let index = getIndex()
        res += chars[index]
    }

    function getIndex () {
        const _random = Math.ceil(Math.random() * chars.length)
        if (_random < chars.length) {
            return _random
        } else {
            return getIndex()
        }
    }

    return res
}

export function getScrollHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}
