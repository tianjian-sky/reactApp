import React from 'react'
import { store } from '../../statesMgr/store'
import { connect } from 'react-redux'
import {  Redirect } from 'react-router'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
        loginStatus: state.loginStatus
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        changeStoreLogin: () => {
            console.log(ownProps)
            dispatch({type:"SET_LOGIN_TRUE", payLoad:{
            }})
        }
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        console.log('loginrr', this)
        this.state = {
            usn: 'a',
            psw: 'b'
        }
    }

    componentDidMount () {
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
            //1. store只支持dispatch中传对象，因此需用到 redux-thunk 中间件进行改造
            // let thunk = function () {
            //     return function (dispatch, getState) {
            //         dispatch({type: 'SET_FETCHING_TRUE'})
            //         let req = new Promise((resolve,reject) => {
            //             setTimeout(() => {
            //                 resolve()
            //             }, 3000)
            //         })
            //         req.then(() => {
            //             dispatch({type: 'SET_FETCHING_FALSE'})
            //         })
            //     }
            // }
            // store.dispatch(thunk())
            // 2 使用redux-promise 使dispatch方法中支持primise
            // 2.1 thunk 的返回值是一个promise
            let thunkP = () => {
                store.dispatch({type: 'SET_FETCHING_TRUE'})
                return new Promise(function (rs, rj) {
                    setTimeout(function () {
                        rs({type: 'SET_FETCHING_FALSE'})
                    }, 3000)
                })
            }
            // 3.redux-promise
            // let thunkP = {
            //     type: 'SET_FETCHING_TRUE',
            //     payload: new Promise(function (rs, rj) {
            //         setTimeout(function () {
            //             rs({type: 'SET_FETCHING_FALSE'})
            //         }, 3000)
            //     })
            // }
            store.dispatch(thunkP())

            //4.redux 异步方案选择 https://segmentfault.com/a/1190000007248878


            // 5. react-redux
            // React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
            this.props.changeStoreLogin()
        }
    }
    render () {
        return (
            this.props.loginStatus ? (
                <Redirect to="/main" />
            ) : (
                <form onSubmit={this.submitLogin}>
                    <div><label>用户名：</label><input type="text" id="inpName-0" onInput={this.handleChange} value={this.state.usn}/></div>
                    <div><label>密码：</label><input type="password" id="inpPwd-0" onInput={this.handleChange} value={this.state.psw}/></div>
                    <input type="submit" id="btnSubmit-0" value="提交"/>
                </form>
            )
        )
    }
}
export const LoginRR = connect(mapStateToProps,mapDispatchToProps)(Login)