import React from 'react'
import { store } from '../../statesMgr/store'

export default class Login extends React.Component {
    constructor(props) {
        
        super(props)
        console.log(this)
        this.state = {
            usn: 'a',
            psw: 'b'
        }
    }
    handleChange =  (e) => {
        let target = e.target
        if (target.id.indexOf('Name') >= 0) {
            this.setState({usn: target.value})
        } else {
            this.setState({psw: target.value})
        }
    }
    submitLogin = (e) => {
        e.preventDefault()
        let usn = document.getElementById('inpName-0').value.trim()
        let psw = document.getElementById('inpPwd-0').value.trim()
        if (usn && psw) {
            //1. 同步action
            // store.dispatch({type: 'SET_LOGIN_TRUE'})
            //2. 异步action
            //2.1 操作开始action
            //2.2 得到异步响应action
            // store只支持dispatch中传对象，因此需用到 redux-thunk 中间件进行改造
            let thunk = () => {
                store.dispatch({type: 'SET_FETCHING_TRUE'})
                let req = new Promise((resolve,reject) => {
                    setTimeout(() => {
                        resolve()
                    }, 3000)
                })
                req.then(() => {
                    store.dispatch({type: 'SET_FETCHING_FALSE'})
                })
            }
            store.dispatch(thunk())
        }
    }
    render () {
        return (
            <div>
                <form onSubmit={this.submitLogin}>
                    <div><label>用户名：</label><input type="text" id="inpName-0" onInput={this.handleChange} value={this.state.usn}/></div>
                    <div><label>密码：</label><input type="password" id="inpPwd-0" onInput={this.handleChange} value={this.state.psw}/></div>
                    <input type="submit" id="btnSubmit-0" value="提交"/>
                </form>
            </div>

        )
    }
}