import React from 'react'
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import ActionLink from "./ActionLink";
import {connect} from 'react-redux';
import config from '../config'

class RegistrationForm extends React.Component {

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    handlePassword2Change = (event) => {
        this.setState({
            password2: event.target.value
        });
    };

    handleClick = (event) => {
        let self = this;
        axios
            .post(config.BASE_URL + '/user', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            .then(function (response) {
                self.doPostRequestTask(response)
            })
            .catch(function (error) {
                if (error.response.status === 400) {
                    self.doPostRequestTask(error.response);
                }
            });
    };

    doPostRequestTask = (response) => {

        this.setState({
            isExecuted: true
        });
        this.setState({
            response: response.data
        });
    };

    delegateClickAction = (source, event) => {
        this.props.execute(source);
    };

    constructor(props) {
        super(props);
        this.state = ({
            name: 'Suresh',
            email: 'suresh.lamgade47@gmail.com',
            password: 'password',
            password2: '',
            isExecuted: false,
            response: {}
        });

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePassword2Change = this.handlePassword2Change.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let allProps = this.props;
        return (
            <div className="internal-container">
                {this.state.isExecuted ?
                    <div>
                        <h2 className="text-center">{this.state.response.message}</h2>
                        <ActionLink  execute={this.delegateClickAction} displayName="Go to login !!" id="loginLink"/>
                    </div>
                    :
                    <form className="form-horizontal" method="post" action="#">
                        {this.props.accessToken}
                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="text" className="form-control" name="name" id="name"
                                           placeholder="Enter your Name"
                                           defaultValue={this.state.name}
                                           handleTextChange={this.handleNameChange}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="text" className="form-control" name="email" id="email"
                                           placeholder="Enter your Email"
                                           defaultValue={this.state.email}
                                           handleTextChange={this.handleEmailChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="password" className="form-control" name="password" id="password"
                                           placeholder="Enter your Password"
                                           defaultValue={this.state.password}
                                           handleTextChange={this.handlePasswordChange}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="password" className="form-control" name="confirm" id="confirm"
                                           placeholder="Confirm your Password"
                                           handleTextChange={this.handlePassword2Change}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group ">
                            <Button type="button"
                                    className="btn btn-primary btn-sm btn-block login-button"
                                    handleClick={this.handleClick}
                                    buttonDisplay="Register"/>
                        </div>
                        <div className="login-register">
                            <ActionLink id="loginLink" displayName="Login" execute={this.delegateClickAction}/>
                        </div>
                    </form>
                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.accessToken
    };
}


export default connect(mapStateToProps)(RegistrationForm);