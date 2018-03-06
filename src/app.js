import React, { Component } from 'react';
import logo from './logo.svg';
import './main.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Welcome from './modules/welcome'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    <Router>
                        <Route path="/" component={Welcome}>
                            
                            {/* <Route path="main" component="Main">
                                <Route path="list" component="List"></Route>
                                <Route path="inqEdit" component="InqEdit"></Route>
                            </Route> */}
                        </Route>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
