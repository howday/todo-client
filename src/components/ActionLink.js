import React from 'react'

class ActionLink extends React.Component {

    handleClick = (e) => {
        this.props.execute(e.target.id);
    };

    constructor(props) {
        super(props)
    }

    render() {
        let allProps = this.props;
        return (
            <a href="#"
               id={allProps.id}
               onClick={this.handleClick}>{allProps.displayName}</a>
        );

    }
}

export default ActionLink;