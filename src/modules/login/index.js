import React from 'react'

export default class Login extends React.Component {
    render () {
        return (
            <div>
                <form>
                    <div><label>用户名：</label><input type="text" id="inpName-0"/></div>
                    <div><label>密码：</label><input type="password" id="inpPwd-0"/></div>
                    <input type="submit" id="btnSubmit-0" value="提交"/>
                </form>
            </div>

        )
    }
}