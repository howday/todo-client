import React from 'react'
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import ActionLink from "./ActionLink";
import {connect} from 'react-redux';
import config from '../config'
import validator from "../Validator";

class RegistrationForm extends React.Component {

    handleNameChange = (event) => {
        let name = event.target.value;
        this.state.nameValidation = validator.validateName(name);
        this.setState({
            name: name,
            initialFormState: false
        });
    };

    handleEmailChange = (event) => {
        let email = event.target.value;
        this.state.emailValidation = validator.validateEmail(email);
        this.setState({
            email: email,
            initialFormState: false
        });
    };

    handlePasswordChange = (event) => {
        let password = event.target.value;
        this.state.passwordValidation = validator.validatePassword(password);
        this.setState({
            password: event.target.value,
            initialFormState: false
        });
    };

    handleConfirmPasswordChange = (event) => {
        let password = this.state.password;
        let confirmPassword = event.target.value;
        this.state.confirmPasswordValidation = validator.validateConfirmPassword(password, confirmPassword);
        this.setState({
            confirmPassword: confirmPassword
        });
    };


    handleClick = (event) => {
        if (this.state.initialFormState) {
            event.preventDefault();
            this.setState({
                nameValidation: {valid: false, message: 'This is required field.'},
                emailValidation: {valid: false, message: 'This is required field.'},
                passwordValidation: {valid: false, message: 'This is required field.'},
                confirmPasswordValidation: {valid: false, message: 'This is required field.'}

            });
            return;
        }

        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        alert('valid');
        return;

        let self = this;
        axios
            .post(config.BASE_URL + '/user', {
                name: name,
                email: email,
                password: password
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
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            isExecuted: false,
            response: {},
            nameValidation: {valid: true, message: ''},
            emailValidation: {valid: true, message: ''},
            passwordValidation: {valid: true, message: ''},
            confirmPasswordValidation: {valid: true, message: ''},
            initialFormState: true
        });

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let allProps = this.props;
        return (
            <div className="internal-container">
                {this.state.isExecuted ?
                    <div>
                        <h2 className="text-center">{this.state.response.message}</h2>
                        <ActionLink execute={this.delegateClickAction} displayName="Go to login !!" id="loginLink"/>
                    </div>
                    :
                    <form className="form-horizontal" method="post" action="#">
                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div
                                    className={this.state.nameValidation.valid ? "input-group" : "input-group has-error"}>
                                        <span className="input-group-addon"><i className="fa fa-user fa"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="text" className="form-control" name="name" id="name"
                                           placeholder="Enter your Name"
                                           defaultValue={this.state.name}
                                           handleTextChange={this.handleNameChange}/>
                                </div>
                                {this.state.nameValidation.valid ? null :
                                    <p className="field-message field-message-tooltip">{this.state.nameValidation.message}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div
                                    className={this.state.emailValidation.valid ? "input-group" : "input-group has-error"}>
                                        <span className="input-group-addon"><i className="fa fa-envelope fa"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="text" className="form-control" name="email" id="email"
                                           placeholder="Enter your Email"
                                           defaultValue={this.state.email}
                                           handleTextChange={this.handleEmailChange}/>
                                </div>
                                {this.state.emailValidation.valid ? null :
                                    <p className="field-message field-message-tooltip">{this.state.emailValidation.message}</p>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div
                                    className={this.state.passwordValidation.valid ? "input-group" : "input-group has-error"}>
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="password" className="form-control" name="password" id="password"
                                           placeholder="Enter your Password"
                                           defaultValue={this.state.password}
                                           handleTextChange={this.handlePasswordChange}/>
                                </div>
                                {this.state.passwordValidation.valid ? null :
                                    <p className="field-message field-message-tooltip">{this.state.passwordValidation.message}</p>}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="cols-sm-10">
                                <div
                                    className={this.state.confirmPasswordValidation.valid ? "input-group" : "input-group has-error"}>
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg"
                                                                               aria-hidden="true"></i></span>
                                    <Input type="password" className="form-control" name="confirm" id="confirm"
                                           placeholder="Confirm your Password"
                                           handleTextChange={this.handleConfirmPasswordChange}/>
                                </div>
                                {this.state.confirmPasswordValidation.valid ? null :
                                    <p className="field-message field-message-tooltip">{this.state.confirmPasswordValidation.message}</p>}
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