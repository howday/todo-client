import React, {Component} from "react";
import axios from "axios";
import config from "../config";
import connect from "react-redux/es/connect/connect";
import {toast} from "react-toastify";

class TableBody extends Component {

    componentDidMount = () => {
        this.setState({
            loading: true
        })
    };
    handleDeleteClick = (task) => {

        let self = this;
        axios
            .delete(config.BASE_URL + '/tasks/' + task._id, {
                headers: {'x-access-token': this.props.accessToken}
            })
            .then(function (response) {
                self.props.deleteCallBack();
                toast.error(<div>Task '{task.name}' is successfully deleted.</div>);
            })
            .catch(function (error) {
            });


    };
    handleEditClick = (task) => {
        this.props.editCallBack(task);
    };
    handleChangeStatusClick = (task) => {
        let self = this;
        let taskStatus = (task.status[0]) === 'completed' ? 'pending' : 'completed';
        axios
            .put(config.BASE_URL + '/tasks/' + task._id, {
                status: taskStatus
            }, {
                headers: {'x-access-token': this.props.accessToken}
            })
            .then(function (response) {
                self.props.changeStatusCallback();
                // toast.success(<div>Task is successfully marked as {taskStatus}.</div>);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    constructor(props) {
        super(props);
        this.state = ({
            loading: true
        });
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleChangeStatusClick = this.handleChangeStatusClick.bind(this);
    }

    render() {

        return (

            <tbody>


            {
                this.props.data.map((listValue, index) => {
                    return (
                        <tr key={index} id={"row" + index}>
                            <td>{index + 1}</td>
                            <td className={listValue.status}>{listValue.name}</td>
                            <td className={listValue.status}>{listValue.description}</td>
                            <td className={listValue.status}>{listValue.last_updated}</td>
                            <td>
                                <a className="complete"
                                   title={listValue.status.indexOf('completed') ? "Set done" : "Set not done"}
                                   data-toggle="tooltip" onClick={() => this.handleChangeStatusClick(listValue)}>
                                    <i className="large material-icons">{listValue.status[0] === 'pending' ? 'done' : 'refresh'}</i>
                                </a>
                                <a className="edit" title="Edit" data-toggle="tooltip"
                                   onClick={() => this.handleEditClick(listValue)}>
                                    <i className="large material-icons">edit</i>
                                </a>
                                <a className="delete" title="Delete" data-toggle="tooltip"
                                   onClick={() => this.handleDeleteClick(listValue)}>
                                    <i className="large material-icons">delete_forever</i>
                                </a>
                            </td>

                        </tr>
                    );
                })
            }

            </tbody>
        )

    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps)(TableBody);