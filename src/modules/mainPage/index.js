import React from 'react'
import PageHead from '../../modules/pageHead'
import PageMain from '../../modules/pageMain'

export default class MainPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        return  (
            <div className="app">
                <PageHead></PageHead>
                <PageMain></PageMain>
            </div>
        )
    }
}