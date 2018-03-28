import './pageMain.less'
import {InqListContainerRR} from '../../modules/inqListContainer'
import { connect } from 'react-redux'
import React from 'react'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
        inquiryList: state.inquiryList
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        // changeStoreLogin: () => {
        //     console.log(ownProps)
        //     dispatch({type:"SET_LOGIN_TRUE", payLoad:{
        //     }})
        // }
    }
}
class PageMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="customizeInqListPage" id="customizeInqListPage-0">
                <div className="toolBanner">
                    <a className="btnCreateInq btnTheme1" id="btnCreateInq-0">+创建问诊单</a>
                    <label className="info">已创建问诊单  100 张</label>
                </div>
                <div className="main" id="customizeInqListPageMain-0">
                    <InqListContainerRR></InqListContainerRR>
                </div>
            </div>



        )
    }
}
export const PageMainRR = connect(mapStateToProps,mapDispatchToProps)(PageMain)