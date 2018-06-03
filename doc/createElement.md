# createElement 方式创建组件

[参考链接](https://reactjs.org/docs/react-without-jsx.html)

``` javascript
import React from 'react'
import { Route } from 'react-router-dom'

export class TestCreateElement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: 'Hello, i\'m rendered by createElement'
        }
    }
    render () {
        return React.createElement(RootComp,
            {title: this.state.title},
            ['Hello, i\'m sub element', 'Hello, i\'m sub element 2']
        )
    }
}

class RootComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Hello, i\'m root element'
        }
        console.log('yyy', this.props.children)
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <div>{this.state.title}</div>
                <div className="container">
                    {/* {this.props.children.forEach(e => {
                        console.log(e)
                        return e
                    })} */}
                    { React.Children.map(this.props.children, (a, b, c) => {
                        console.log('===>', a,b,c)
                        return a
                    })}
                </div>
            </div>
        )
    }
}

class SubComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Hello, i\'m sub element'
        }
    }
    render () {
        return(
            <h3>{this.state.title}</h3>
        )
    }
}
```