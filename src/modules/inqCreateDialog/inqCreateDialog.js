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
        return  (
            <div class="createInqDialogBox">
                <div class="createInqDialogBoxHead">
                    创建问诊单
                    <a class="btnClose" id="btnCreateInqDialogBox-0"></a>
                </div>
                <div class="createInqDialogBoxBody">
                    <div class="left">
                        <div class="font1">创建空白问诊单</div>
                        <div class="font2">从一份空白问诊单开始创建</div>
                        <div class="createArea">
                            <div class="fileIcon"></div>
                            <a class="btnTheme1 btnCreateInq">开始创建</a>
                            <div class="clickMask" id="btnCreateInqBlank-0"></div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="font1">选择模板</div>
                        <div class="font2">您还可以选择系统问诊单为模板进行修改来创建新问诊单</div>
                        <ul class="templateList">
                            {/* <%
                                for (var i = 0; i < list.length; i++) {
                                    var cur = list[i];
                            %>
                                <li class="templateListItem" id="btnUseTemplate-${i}">
                                    <p class="title">${cur.name}</p>
                                    <p class="subtitle">${cur.count}题</p>
                                    <div class="btnWrap">
                                        <a class="btnTheme2 btnUseTemplate" data-name="${cur.name}">使用此模板</a>
                                    </div>
                                    <div class="clickMask" id="templateListItem-${cur.id}" data-name="${cur.name}"></div>
                                    <!-- <div class="clickMask" id="templateListItem-${cur.id}" data-name="${cur.name}"></div> -->
                                </li>
                            <%
                                }
                            %> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export const InqCreateDialogRR = connect(mapStateToProps,mapDispatchToProps)(InqCreateDialog)