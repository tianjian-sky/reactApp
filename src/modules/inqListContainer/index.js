import React from 'react'
import { connect } from 'react-redux'
import inqList from '../../mock/inquirieList.json'
import '../../components/inqListItem/inqListItem.css'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {

    }
}

class InqListContainer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        let lists = []
        inqList.map(function (v, i) {
            lists.push( 
                <li className="inqListItem" id="inqListItem-cjlhn3yhx3s4o" key = {v.id}>
                    <div className="itemMain">
                        <p className="title">问诊单1</p>
                        <p className="time">创建: 2018-03-02</p>
                    </div>
                    <div className="clickMask" id="btnEdit-cjlhn3yhx3s4o"></div>
                    <div className="btnListWrap">
                        <div className="btnList">
                            <a className="btnEdit btn" id="btnEdit-cjlhn3yhx3s4o">编辑</a>
                            <a className="btnCopy btn" id="btnCopy-cjlhn3yhx3s4o">复制</a>
                        </div>
                    </div>
                </li>
            )
        })
        return  (
            <ul className="inqList" id="inqList-0">
                {lists}
            </ul>
        )
    }
}
export const InqListContainerRR = connect(mapStateToProps,mapDispatchToProps)(InqListContainer)