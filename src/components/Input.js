import React from 'react'

class Input extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let allProps = this.props;
        return(
            <input
                type={allProps.type}
                name={allProps.name}
                id={allProps.id}
                className={allProps.className}
                placeholder={allProps.placeholder}
                defaultValue={allProps.defaultValue}
                onChange={allProps.handleTextChange}
            />
        );
    }
}

export default Input;