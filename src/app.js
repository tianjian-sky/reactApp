import React, { Component } from 'react';
import './main.css';
import { HashRouter as Router, Route} from 'react-router-dom'
import Welcome from './modules/welcome'
import MainPage from './modules/mainPage'
import { store } from './statesMgr/store'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loginStatus: false
        }
        setInterval(() => {
            console.log(store.getState())   
        }, 1000)
    }
    render() {
        return (
            <Router>
                <div id="app">
                    {
                        store.getState.loginStatus ? 
                            <Route path="/main" component={MainPage}/> : 
                            <Route path="/" component={Welcome} /> 
                    }
                </div>
            </Router>
        );
    }
}

export default App;
