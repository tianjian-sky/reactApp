import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import './inqCreateDialog.less'
import inqTplList from '../../mock/inqTplList.json'

const mapStateToProps = (state, ownProps) => { // connect方法在执行时自动将此方法返回的状态注入到组件的props中
    return {
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
    }
}

class InqCreateDialog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    closeDialog = () => {
        this.props.handleCreateInq(false)
    }

    componentDidMount = () => {
    }

    componentWillReceiveProps = (nextProps) => {
    }

    shouldComponentUpdate = (nextProps, nextState) => {
    }

    componentWillUpdate = (nextProps, nextState) => {
    }

    componentDidUpdate = () => {
    }

    componentWillUnmount = () => {
    }

    getInqList = () => {
    }

    render = () => {
        let lists = []
        let data = inqTplList
        let styleObj= {
            marginLeft:8,
            marginRight:8
        }
        data.map((v, i) => {
            lists.push(
                <li className="templateListItem" id="btnUseTemplate-{i}" key={"btnUseTemplate-" + i}>
                    <p className="title">{v.name}</p>
                    <p className="subtitle">{v.count}题</p>
                    <div className="btnWrap">
                        <a className="btnTheme2 btnUseTemplate" data-name="{v.name}">使用此模板</a>
                    </div>
                    <div className="clickMask" id="templateListItem-{v.id}" data-name="{v.name}"></div>
                    <div className="clickMask" id="templateListItem-{v.id}" data-name="{v.name}"></div>
                </li>
            )
        })

        return  (
            <div className="createInqDialogBox">
                <div className="createInqDialogBoxHead">
                    创建问诊单
                    <a onClick= {this.closeDialog} className="btnClose" id="btnCreateInqDialogBox-0"></a>
                </div>
                <div className="createInqDialogBoxBody">
                    <div className="left">
                        <div className="font1">创建空白问诊单</div>
                        <div className="font2">从一份空白问诊单开始创建</div>
                        <div className="createArea">
                            <div className="fileIcon"></div>
                            <a className="btnTheme1 btnCreateInq">开始创建</a>
                            <div className="clickMask" id="btnCreateInqBlank-0"></div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="font1">选择模板</div>
                        <div className="font2">您还可以选择系统问诊单为模板进行修改来创建新问诊单</div>
                        <ul className="templateList">
                            {lists}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export const InqCreateDialogRR = connect(mapStateToProps,mapDispatchToProps)(InqCreateDialog)