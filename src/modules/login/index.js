import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            usn: 'a',
            psw: 'b'
        }
    }
    handleChange (e) {
        let target = e.target
        if (target.id.indexOf('Name') >= 0) {
            this.setState({usn: target.value})
        } else {
            this.setState({psw: target.value})
        }
    }
    submitLogin (e) {
        e.preventDefault()
        let usn = document.getElementById('inpName-0').value.trim()
        let psw = document.getElementById('inpPwd-0').value.trim()
    }
    render () {
        return (
            <div>
                <form onSubmit={this.submitLogin}>
                    <div><label>用户名：</label><input type="text" id="inpName-0" onInput={this.handleChange.bind(this)} value={this.state.usn}/></div>
                    <div><label>密码：</label><input type="password" id="inpPwd-0" onInput={this.handleChange.bind(this)} value={this.state.psw}/></div>
                    <input type="submit" id="btnSubmit-0" value="提交"/>
                </form>
            </div>

        )
    }
}