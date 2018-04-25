import './pageMain.less'
import {InqListContainerRR} from '../../modules/inqListContainer'
import  { InqCreateDialogRR } from '../inqCreateDialog/inqCreateDialog'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
        inquiryList: state.inqList
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
            showCrateInqDialog: false
        }
    }
    handleCreateInq = (flg) => {
        this.setState({showCrateInqDialog: flg})
    }
    /**
     *  不使用redux的情况下跨层级传递prop，使用context
     * 1）在父级定义context对象的数据类型
     * 类型
     * ParentComponent.childContextTypes = {
     *       contextProp1: PropTypes.string
     * }
     * 2）在父级定义要传递的context对象的数据， 通过使用getChildContext（）方法
     *  getChildContext = () => {
            return {
                contextProp1: 'red'
            }
     *   }
     * 3)使用端定义需要接收的context对象成员类型 （基于prop-types库
     * InqListItem.contextTypes = {
     *       contextProp1: PropTypes.string
     *   }）
     */


    getChildContext = () => {
        return {
            contextProp1: 'red'
        }
    }
    render () {
        return (
            <div className="customizeInqListPage" id="customizeInqListPage-0">
                <div className="toolBanner">
                    <a className="btnCreateInq btnTheme1" id="btnCreateInq-0" onClick={() => this.handleCreateInq(true)}>+创建问诊单</a>
                    <label className="info">已创建问诊单  {this.props.inquiryList ? this.props.inquiryList.length : 0} 张</label>
                </div>
                <div className="main" id="customizeInqListPageMain-0">
                    <InqListContainerRR>
                        <span>这里是问诊单列表容器</span>
                        <span>这里是问诊单列表容器 slot 2</span>
                    </InqListContainerRR>
                </div>
                {this.state.showCrateInqDialog ? <InqCreateDialogRR handleCreateInq={this.handleCreateInq}/> : ''}
            </div>
        )
    }
}
PageMain.childContextTypes = {
    contextProp1: PropTypes.string
}
export const PageMainRR = connect(mapStateToProps,mapDispatchToProps)(PageMain)
