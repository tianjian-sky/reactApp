import React from 'react'
import { Route } from 'react-router-dom'

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
                    {/* {this.props.children[0]}
                    {this.props.children[1]} */}

                    {/** 不能用foreach，因为无返回值 推荐用React.Children.map*/}

                    {/* { React.Children.map(this.props.children, (a, b, c) => {
                        console.log('===>', a,b,c)
                        return a
                    })} */}
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
            [ React.createElement(SubComp, null), 'text content']
        )
    }
}