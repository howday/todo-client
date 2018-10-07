import React, {Component} from 'react';
// import Modal from "react-bootstrap/es/Modal";
import Input from "./Input";
import Button from "./Button";
import {Modal} from "react-bootstrap";
import axios from "axios";
import config from "../config";
import validator from "../Validator";
import {toast} from "react-toastify";

class ForgotPasswordModal extends Component {
    closeModal = () => {
        this.setState({show: false});
    };

    handleEmailChange = (event) => {
        let email = event.target.value;
        this.state.emailValidation = validator.validateEmail(email);
        this.setState({
            email: email,
            initialFormState: false
        });
    };
    handleCodeChange = (event) => {
        let code = event.target.value;
        this.state.codeValidation = validator.validateResetCode(code);
        this.setState({
            code: event.target.value,
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
            confirmPassword: confirmPassword,
            initialFormState: false
        });
    };
    handleGetResetCode = (event) => {
        if (this.state.initialFormState) {
            event.preventDefault();
            this.setState({
                emailValidation: {valid: false, message: 'This is required field.'},
            });
            return;
        }

        let self = this;
        let email = self.state.email;
        axios
            .get(config.BASE_URL + '/forgot_password?email=' + email)
            .then(function (response) {
                self.setState({
                    codeRequestMessage: response.data.message,
                    showPasswordChangeOption: true,
                    initialFormState: true
                });
            })
            .catch(function (error) {
                self.setState({
                    codeRequestMessage: error.response.data.message,
                    initialFormState: true
                });
            });
    };

    handleChangePassword = (event) => {
        /**
         * When we see the form for the first time and nothing is changed
         */
        if (this.state.initialFormState) {
            event.preventDefault();
            this.setState({
                codeValidation: {valid: false, message: 'This is required field.'},
                passwordValidation: {valid: false, message: 'This is required field.'},
                confirmPasswordValidation: {valid: false, message: 'This is required field.'}

            });
            return;
        }

        let email = this.state.email;
        let password = this.state.password;
        let confirmPassword = this.state.confirmPassword;
        let code = this.state.code;

        this.setState({
            codeValidation: validator.validateResetCode(code),
            passwordValidation: validator.validatePassword(password),
            confirmPasswordValidation: validator.validateConfirmPassword(password,confirmPassword)

        });

        if(!(this.state.codeValidation.valid &&
            this.state.passwordValidation.valid &&
            this.state.confirmPasswordValidation.valid)){
            event.preventDefault();
            return;
        }


        let self = this;
        axios.put(config.BASE_URL + '/change_password', {email: email, password: password, code: code})
            .then(function (response) {
                toast.success(<div>{response.data.message}</div>);
                self.setState({
                    show: false,
                });
            }).catch(function (error) {
            console.log(error.response);
            self.setState({
                changePasswordMessage: error.response.data.message,
            });
        });
    };

    constructor(props) {
        super(props);
        console.log(props.state);
        this.state = ({
            show: props.show,
            email: '',
            password: '',
            confirmPassword: '',
            codeRequestMessage: '',
            code: '',
            showPasswordChangeOption: false,
            changePasswordMessage: '',
            initialFormState: true,
            emailValidation: {valid: true, message: ''},
            codeValidation: {valid: true, message: ''},
            passwordValidation: {valid: true, message: ''},
            confirmPasswordValidation: {valid: true, message: ''},
        });

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleGetResetCode = this.handleGetResetCode.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.show,
            showPasswordChangeOption: !props.show,
            codeRequestMessage: ''
        })
    }

    render() {
        return (
            <Modal show={this.state.show} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={this.state.emailValidation.valid ? "form-group" : "form-group has-error"}>
                        <label htmlFor="email" className="col-2 col-form-label">Please enter your email</label>
                        <div className="cols-sm-5">
                            <Input type="text" className="form-control" name="email" id="email"
                                   placeholder="Your email here..."
                                   defaultValue={this.state.email}
                                   handleTextChange={this.handleEmailChange}/>
                        </div>
                        {this.state.emailValidation.valid ? null :
                            <p className="field-message field-message-tooltip">{this.state.emailValidation.message}</p>}
                    </div>
                    <Button type="button"
                            className="btn btn-primary btn-sm"
                            handleClick={this.handleGetResetCode}
                            buttonDisplay="Get reset code !"/>
                    {this.state.codeRequestMessage ?
                        <p style={{color: 'red'}}><i>{this.state.codeRequestMessage}</i></p> : null}

                    {
                        this.state.showPasswordChangeOption ?

                            (<div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-2 col-form-label">Reset Code</label>
                                    <div className="cols-sm-5">
                                        <Input type="text" className="form-control" name="code" id="code"
                                               placeholder="Your code here..."
                                               defaultValue={this.state.code}
                                               handleTextChange={this.handleCodeChange}/>
                                    </div>
                                    {this.state.codeValidation.valid ? null :
                                        <p className="field-message field-message-tooltip">{this.state.codeValidation.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-2 col-form-label">Please enter your new
                                        password</label>
                                    <div className="cols-sm-5">
                                        <Input type="password" className="form-control" name="password" id="password"
                                               placeholder="Your new password here..."
                                               defaultValue={this.state.password}
                                               handleTextChange={this.handlePasswordChange}/>
                                    </div>
                                    {this.state.passwordValidation.valid ? null :
                                        <p className="field-message field-message-tooltip">{this.state.passwordValidation.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="col-2 col-form-label">Please confirm your new
                                        password</label>
                                    <div className="cols-sm-5">
                                        <Input type="password" className="form-control" name="confirmPassword"
                                               id="confirmPassword"
                                               placeholder="Confirm password here..."
                                               defaultValue={this.state.confirmPassword}
                                               handleTextChange={this.handleConfirmPasswordChange}/>
                                    </div>
                                    {this.state.confirmPasswordValidation.valid ? null :
                                        <p className="field-message field-message-tooltip">{this.state.confirmPasswordValidation.message}</p>}
                                </div>
                                <Button type="button"
                                        className="btn btn-primary btn-sm"
                                        handleClick={this.handleChangePassword}
                                        buttonDisplay="Change Password"/>
                                {this.state.changePasswordMessage ?
                                    <p style={{color: 'red'}}><i>NOTE: {this.state.changePasswordMessage}</i>
                                    </p> : null}
                            </div>) : null}

                </Modal.Body>
            </Modal>
        )
    }
}

export default ForgotPasswordModal;