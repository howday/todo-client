import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import config from "../config";

class TodoTable extends Component {

    fetchUserTodos = () => {
        let _this = this;
        axios
            .get(config.BASE_URL + '/tasks',
                {
                    headers: {'x-access-token': this.props.accessToken}
                })
            .then(function (response) {
                console.log('request data');
                console.log(response.data);
                _this.setState({
                    todoData: response.data
                })
            }).catch(function (error) {
                console.log(error);
            });


    };
    componentDidMount = () => {
        this.fetchUserTodos();
    };

    constructor(props) {
        super(props);
        this.state = ({
            todoData : []
        })
    }

    render() {
        return (
            <div>{this.props.todoData}
               <BootstrapTable data={this.state.todoData}>
                    <TableHeaderColumn isKey dataField='name'>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='description'>
                        Description
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='last_updated'>
                        Last Updated
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(TodoTable);