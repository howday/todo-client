import React from 'react'
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import {connect} from 'react-redux';
import config from '../config'
import validator from "../Validator";

class RegistrationForm extends React.Component {

    handleNameChange = (event) => {
        let name = event.target.value;
        this.setState({
            nameValidation:validator.validateName(name),
            name: name,
            initialFormState: false
        });
    };

    handleEmailChange = (event) => {
        let email = event.target.value;
        this.setState({
            emailValidation: validator.validateEmail(email),
            email: email,
            initialFormState: false
        });
    };

    handlePasswordChange = (event) => {
        let password = event.target.value;
        this.setState({
            passwordValidation:validator.validatePassword(password),
            password: event.target.value,
            initialFormState: false
        });
    };

    handleConfirmPasswordChange = (event) => {
        let password = this.state.password;
        let confirmPassword = event.target.value;
        this.setState({
            confirmPasswordValidation: validator.validateConfirmPassword(password, confirmPassword),
            confirmPassword: confirmPassword,
            initialFormState: false
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
        let confirmPassword = this.state.confirmPassword;

        this.setState({
            nameValidation: validator.validateName(name),
            emailValidation: validator.validateEmail(email),
            passwordValidation: validator.validatePassword(password),
            confirmPasswordValidation: validator.validateConfirmPassword(password,confirmPassword)

        });

        if(!(this.state.nameValidation.valid &&
            this.state.emailValidation.valid &&
            this.state.passwordValidation.valid &&
            this.state.confirmPasswordValidation.valid)){
            event.preventDefault();
            return;
        }

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

    showLogin = (event) => {
        this.props.execute(event.target.id);
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
        this.showLogin = this.showLogin.bind(this);
    }

    render() {
        return (
            <div className="internal-container">
                {this.state.isExecuted ?
                    <div>
                        <h2 className="text-center">{this.state.response.message}</h2>
                        <Button type="button"
                                className="btn btn-link"
                                id="loginLink"
                                handleClick={this.showLogin}
                                buttonDisplay="Go to login"/>
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
                            <Button type="button"
                                    className="btn btn-link"
                                    id="loginLink"
                                    handleClick={this.showLogin}
                                    buttonDisplay="Go to login"/>
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