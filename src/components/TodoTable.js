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
                _this.props.dispatch({type: 'SET_TODO_DATA', todoData: response.data});
            }).then((data) => {
            // this.setState({todoData: data});
            console.log("componentDidMount 2");
        })
            .catch(function (error) {
                console.log(error);
            });


    };
    componentDidMount = () => {
        this.fetchUserTodos()
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.todoData}
               <BootstrapTable data={this.props.todoData}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(TodoTable);