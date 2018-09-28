import React, {Component} from 'react';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import config from "../config";
import Button from "./Button";
import {Modal, Popover, Table, Tooltip} from 'react-bootstrap'
import Input from "./Input";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

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

    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {
        this.setState({show: true});
    };

    handleTaskNameChange = (event) => {
        this.setState({
            taskName: event.target.value
        });
    };

    handleTaskDescriptionChange = (event) => {
        this.setState({
            taskDescription: event.target.value
        });
    };

    handleTaskCreate = () => {

        console.log('Authtoken: ' + this.props.accessToken);
        let self = this;
        axios
            .post(config.BASE_URL + '/tasks', {
                name: this.state.taskName,
                description: this.state.taskDescription
            }, {
                headers: {'x-access-token': this.props.accessToken}
            })
            .then(function (response) {
                self.handleClose();
                self.fetchUserTodos();
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
        this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
        this.handleTaskCreate = this.handleTaskCreate.bind(this);

        this.state = ({
            todoData: [],
            show: false,
            taskName: '',
            taskDescription: ''
        });

    }

    render() {

        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        return (
            <div className="container-fluid">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task for Suresh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <div className="cols-sm-5">
                                <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="text" className="form-control" name="email" id="email"
                                           placeholder="Enter task name here..."
                                           defaultValue={this.state.taskName}
                                           handleTextChange={this.handleTaskNameChange}/>
                                </div>
                            </div>
                            <i className="fas fa-file-signature"></i>
                        </div>
                        <div className="form-group">
                            <div className="cols-sm-5">
                                <div className="input-group">
                                    <span className="input-group-addon"> <i className="fa fa-sticky-note"></i></span>
                                    <Input type="text" className="form-control" name="password" id="password"
                                           placeholder="Enter task description here..."
                                           defaultValue={this.state.taskDescription}
                                           handleTextChange={this.handleTaskDescriptionChange}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button"
                                className="btn btn-success btn-sm"
                                handleClick={this.handleTaskCreate}
                                buttonDisplay="Create"/>
                        <Button type="button"
                                className="btn btn-primary btn-sm"
                                handleClick={this.handleClose}
                                buttonDisplay="Close"/>
                    </Modal.Footer>
                </Modal>
                <Button type="button"
                        className="btn btn-primary btn-sm"
                        handleClick={this.handleShow}
                        buttonDisplay="Add Task"/>

                <Table striped bordered condensed hover>
                    <TableHead headers={['#', 'Name', 'Description', 'Last Updated','Actions']}/>
                    <TableBody data={this.state.todoData}/>
                </Table>
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