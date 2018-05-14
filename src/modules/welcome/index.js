import React from 'react'
import { Route } from 'react-router-dom'
import { LoginRR } from '../login'
import logo from '../../logo.svg'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    console.log('state from store', state)
    return {
        loginStatus: state.loginStatus,
        fetching: state.fetching,
        nonExist: 'dummy'
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        changeFetching: () => {
            let nonce = Math.random()*1000
            dispatch({type:"SET_FETCHING", payLoad:{
                nonce: nonce
            }})
        }
    }
}

class Welcome extends React.Component {
    constructor (props) {
        super(props)
        this.nonce = Math.floor(Math.random()*10000)
        console.log('comp props:', this.props)
        console.log('comp', this)
        this.state = {
            stateNonce:this.nonce
        }
    }
    changeMember= () => {
        this.nonce = Math.floor(Math.random()*10000)
        console.log('**',this)
        this.render()
    }
    changeState= () => {
        this.setState({
            stateNonce: Math.floor(Math.random()*10000)
        })
        console.log('**',this)
    }
    componentDidMount () {
    }
    myFunc () {
        console.log('一般成员方法this', this)
    }
    testThis () {
        console.log("watch this", this)
    }
    testThis
    render(m) {
        this.myFunc()
        console.log('class 成员方法中的this', this)
        return (
            <div className="App" style={{ height: '100%' }}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <h1 className="App-title" >
                        The current loginStatus powered by react-redux is:<br/>
                        LOGIN:{this.props.loginStatus.toString()}<br/>
                        FETCHING: {this.props.fetching.toString()}
                    </h1>
                    <a onClick={this.props.changeFetching}>点我改变状态</a>
                </header>
                <div className="App-intro">
                    <div>
                        <h1>Welcome, guest!自定义问诊单</h1>
                        <Route path={this.props.match.url + "/login"} component={LoginRR} ></Route>
                    </div>
                </div>
                <button onClick={this.changeMember}>点我查看组件成员属性改变能否改变视图。 当前的值：{this.nonce}</button><br/>
                <button onClick={this.changeState}>点我查看组件state改变能否改变视图。 当前的值：{this.state.stateNonce}</button><br/>
                <button onClick={this.changeMember}>点我查看组件props改变能否改变视图(显然！)。 当前的值：{this.nonce}</button><br/>
                <button onClick={this.testThis}>查看this指向未绑定：</button><br/>
                <button onClick={this.testThis.bind(this)}>查看this指向绑定：</button>
                <br/>
                <br/>
            </div>
        )
    }
}
export const WelcomeRR = connect(mapStateToProps,mapDispatchToProps)(Welcome)
