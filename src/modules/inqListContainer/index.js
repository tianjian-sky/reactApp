import React from 'react'
import { store } from '../../statesMgr/store'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {

    }
}

export default class InqListContainer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        return  (
            <ul className="inqList" id="inqList-0">
            
            </ul>
        )
    }
}