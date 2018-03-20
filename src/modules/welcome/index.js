import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../login'
import logo from '../../logo.svg'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    console.log('state from store', state)
    return {
        loginStatus: state.loginStatus,
        fetching: state.fetching
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
}

class Welcome extends React.Component {
    constructor (props) {
        super(props)
        console.log('comp props:', this.props)
        console.log('comp', this)
    }
    render(m) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    <h1 className="App-title">
                        The current loginStatus powered by react-redux is:<br/>
                        LOGIN:{this.props.loginStatus.toString()}<br/>
                        FETCHING: {this.props.fetching.toString()}
                    </h1>
                </header>
                <div className="App-intro">
                    <div>
                        <h1>Welcome, guest!自定义问诊单</h1>
                        <Route path={this.props.match.url + "login"} component={Login} ></Route>
                    </div>
                </div>
            </div>
        )
    }
}
export const WelcomeRR = connect(mapStateToProps,mapDispatchToProps)(Welcome)
