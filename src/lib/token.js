import { http } from 'httpRequest'

const setTimer = Symbol('setTimer')
const refreshToken = Symbol('refreshToken')
const listening = Symbol('listening')

class Token {
    constructor () {
        this.timer = null
    }

    get [setTimer] () {
        return this.timer
    }

    set [setTimer] (state) {
        this.timer = state
        if (state === null) this[refreshToken]()
    }

    listenTokenExpire (tokenInfo) {
        const timestamp = new Date().getTime() + tokenInfo.auth_expire * 1000 // 8000
        tokenInfo.tokenExpire = timestamp

        window.sessionStorage.setItem('token', JSON.stringify(tokenInfo))

        this[setTimer] !== null && clearTimeout(this.timer)
        this[listening](timestamp - 600000) // 1000
    }

    [listening] (timestamp) {
        const currTime = new Date().getTime()

        if (currTime > timestamp) {
            clearTimeout(this.timer)

            this[setTimer] = null
        } else {
            this[setTimer] = setTimeout(() => {
                // console.log(currTime, timestamp, currTime < timestamp)
                this[listening](timestamp)
            }, 30000) // 1000
        }
    }

    [refreshToken] () {
        const tokenData = JSON.parse(window.sessionStorage.getItem('token'))
        const newToken = http.request({
            method: 'get',
            url: 'common/accounts/refresh-pc-token',
            opt: {
                refresh_token: tokenData.refresh_token
            },
            type: 'php'
        })

        newToken.then(response => {
            this.listenTokenExpire(http.response(response))
        })

        newToken.catch(err => {
            console.error(err)
        })
    }
}

export const token = new Token()
