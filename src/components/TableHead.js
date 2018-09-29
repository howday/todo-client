import React, {Component} from "react";

class TableHead extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <thead>
            <tr>
                {
                    this.props.headers.map((headerName) => <th key={headerName}>{headerName}</th>)
                }
            </tr>
            </thead>
        )

    }
}

export default TableHead;
