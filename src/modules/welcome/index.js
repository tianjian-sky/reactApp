import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../login'
import logo from '../../logo.svg';

export default class Welcome extends React.Component {
    render(m) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <div>
                        <h1>Welcome, guest!自定义问诊单</h1>
                        <Route path={this.props.match.url + "login"} component={Login}></Route>
                    </div>
                </div>
            </div>
        )
    }
}
