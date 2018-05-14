import React from 'react'
import PropTypes from 'prop-types'

let InputControlES5 = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: PropTypes.string
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            text: this.props.initialValue || 'placeholder'
        };
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                <h1>Components created by with createClass</h1>
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
});
InputControlES5.propTypes = {
    initialValue: PropTypes.string
};
InputControlES5.defaultProps = {
    initialValue: ''
};