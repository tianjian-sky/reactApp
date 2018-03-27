import React, { Component } from 'react';
import './main.css';
import { HashRouter as Router, Route} from 'react-router-dom'
import { WelcomeRR } from './modules/welcome'  // react-redux 组件
import MainPage from './modules/mainPage'
import { store } from './statesMgr/store'

import { Provider } from 'react-redux'

class App extends Component {
    constructor (props) {
        super(props)
        setInterval(() => {
            console.log(store.getState())   
        }, 1000)
        this.state = {
            login: false
        }
        // 1. 改变this.state 自动调用render，刷新视图
        // <h1>Current state: {store.getState().loginStatus ? 'Login' : 'Unlogin'}</h1>

        store.subscribe(() => {
            this.setState({
                login: true
            })
        })

        // 2.调用store.subscribe(this.render)
        //store状态更新后，render触发，但是视图未刷新
        // store.subscribe(this.render)
    }
    render() {
        // 如何通过Route向组件传props
        return (
            <Provider store={store}>
                <Router>
                    <div id="app">
                        <Route path="/main" component={MainPage}/> : 
                        <Route path="/hello" component={WelcomeRR} parent={this}/> 
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
