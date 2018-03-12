import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../login'

export default class Welcome extends React.Component {
    render(m) {
        console.log(this.props.match.url)
        return (
            <div>
                <h1>Welcome, guest!自定义问诊单</h1>
                <Route path={this.props.match.url + "login"} component={Login}></Route>
            </div>
        )
    }
}
