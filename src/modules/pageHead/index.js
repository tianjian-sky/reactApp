import '../../globalStyle/global.less'
import './pageHead.less'
import docJson from '../../mock/doc.json'
import React from 'react'
export default class PageHead extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="djHead" id="djhead-0">
                <div className="djLogo"></div>
                <div className="headTool clearfix">
                    <span className="thumb$ female" id="docPortrait-0" style={{}}></span>
                    <span className="name" id="name-0">{docJson.name}</span>
                    <div className="spacer"></div>
                    <span className="btnExit" id="btnExit-0">退出</span>
                </div>
            </div>
        )
    }
}