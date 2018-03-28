import React from 'react'
import PageHead from '../../modules/pageHead'
import {PageMainRR} from '../../modules/pageMain'

export default class MainPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        return  (
            <div style={{ height: '100%' }} className="app">
                <PageHead></PageHead>
                <PageMainRR></PageMainRR>
            </div>
        )
    }
}