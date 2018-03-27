import './pageMain.less'
import InqListContainer from '../../modules/inqListContainer'
import React from 'react'

export default class PageMain extends React.Component {
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
                    <InqListContainer></InqListContainer>
                </div>
            </div>



        )
    }
}