import React, {Component} from "react";


class TableBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <tbody>


            {
                this.props.data.map(( listValue, index ) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{listValue.name}</td>
                            <td>{listValue.description}</td>
                            <td>{listValue.last_updated}</td>
                            <td>
                                <a style={{color:'#FFC107',marginRight:'10px'}} className="edit" title="Edit" data-toggle="tooltip"><i
                                    className="material-icons">&#xE254;</i></a>
                                <a  style={{color: '#E34724'}} className="delete" title="Delete" data-toggle="tooltip"><i
                                    className="material-icons">&#xE872;</i></a>
                            </td>

                        </tr>
                    );
                })
            }

            </tbody>
        )

    }
}

export default TableBody;