import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let allProps = this.props;
        return (
            <button type={allProps.type}
                    className={allProps.className}
                    style={{'marginBottom': '5px'}}
                    onClick={this.props.handleClick}>{this.props.buttonDisplay}</button>
        )

    }
}

export default Button