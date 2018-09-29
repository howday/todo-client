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
import {toast} from 'react-toastify';


class TodoTable extends Component {

    fetchUserTodos = () => {
        let _this = this;
        axios
            .get(config.BASE_URL + '/tasks',
                {
                    headers: {'x-access-token': this.props.accessToken}
                })
            .then(function (response) {
                console.log(response.data);
                // setTimeout(function () {
                _this.setState({
                    todoData: response.data
                })
                // }, 1000);

            }).catch(function (error) {
            console.log(error);
        });


    };
    componentDidMount = () => {
        this.fetchUserTodos();
    };

    closeModal = () => {
        this.setState({show: false});
    };

    showAddEditModal = (action) => {
        this.state.isEdit = action === 'edit';
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
        let self = this;
        axios
            .post(config.BASE_URL + '/tasks', {
                name: this.state.taskName,
                description: this.state.taskDescription
            }, {
                headers: {'x-access-token': this.props.accessToken}
            })
            .then(function (response) {
                self.closeModal();
                self.fetchUserTodos();
                toast.success(<div>Task '{self.state.taskName}' is successfully created.</div>);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleTaskEdit = () => {
        let self = this;
        axios
            .put(config.BASE_URL + '/tasks/' + this.state.taskId, {
                name: this.state.taskName,
                description: this.state.taskDescription
            }, {
                headers: {'x-access-token': this.props.accessToken}
            })
            .then(function (response) {
                self.closeModal();
                self.fetchUserTodos();
                toast.success(<div>Task is successfully updated.</div>);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleDeleteCallback = () => {
        this.fetchUserTodos();
    };

    handleEditCallback = (task) => {
        this.state.taskId = task._id;
        this.state.taskName = task.name;
        this.state.taskDescription = task.description;
        this.state.modalHeader = 'Edit Task';
        this.showAddEditModal('edit');
    };

    handleChangeStatusCallback = () => {
        this.fetchUserTodos();
    };


    constructor(props) {
        super(props);

        this.showAddEditModal = this.showAddEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
        this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
        this.handleTaskCreate = this.handleTaskCreate.bind(this);
        this.handleDeleteCallback = this.handleDeleteCallback.bind(this);
        this.handleEditCallback = this.handleEditCallback.bind(this);
        this.handleChangeStatusCallback = this.handleChangeStatusCallback.bind(this);

        this.state = ({
            todoData: [],
            show: false,
            taskId: '',
            taskName: '',
            taskDescription: '',
            loading: true,
            modalHeader: 'Add Task',
            isEdit: false
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
                <Modal show={this.state.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalHeader}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="email" className="col-2 col-form-label">Task Name</label>
                            <div className="cols-sm-5">
                                <Input type="text" className="form-control" name="email" id="email"
                                       placeholder="Enter task name here..."
                                       defaultValue={this.state.taskName}
                                       handleTextChange={this.handleTaskNameChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-2 col-form-label">Task Description</label>
                            <div className="col-10">
                                <Input type="text" className="form-control" name="password" id="password"
                                       placeholder="Enter task description here..."
                                       defaultValue={this.state.taskDescription}
                                       handleTextChange={this.handleTaskDescriptionChange}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.state.isEdit ? <Button type="button" className="btn btn-success btn-sm"
                                                        handleClick={this.handleTaskEdit}
                                                        buttonDisplay="Update"/>
                                : <Button type="button"
                                          className="btn btn-success btn-sm"
                                          handleClick={this.handleTaskCreate}
                                          buttonDisplay="Create"/>

                        }
                        <Button type="button"
                                className="btn btn-primary btn-sm"
                                handleClick={this.closeModal}
                                buttonDisplay="Close"/>
                    </Modal.Footer>
                </Modal>
                <Button type="button"
                        className="btn btn-primary btn-sm"
                        handleClick={this.showAddEditModal}
                        buttonDisplay="Add Task"/>
                <Table striped bordered condensed hover>
                    <TableHead headers={['#', 'Name', 'Description', 'Last Updated', 'Actions']}/>
                    <TableBody data={this.state.todoData}
                               deleteCallBack={this.handleDeleteCallback}
                               editCallBack={this.handleEditCallback}
                               changeStatusCallback={this.handleChangeStatusCallback}
                    />
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