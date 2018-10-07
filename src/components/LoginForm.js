import React from 'react'
import Input from "./Input";
import Button from "./Button";
import ActionLink from "./ActionLink";
import ForgotPasswordModal from "./ForgotPasswordModal";
import axios from "axios";
import config from '../config'
import {connect} from 'react-redux';
import validator from '../Validator'

class LoginForm extends React.Component {

    handleEmailChange = (event) => {
        let email = event.target.value;
        this.state.emailValidation = validator.validateEmail(email);
        this.setState({
            email: email,
            showForgotPasswordModal: false
        });
    };

    handlePasswordChange = (event) => {
        let password = event.target.value;
        this.setState({
            password: password,
            showForgotPasswordModal: false
        });
    };

    handleClick = (event) => {
        let email = this.state.email;
        let password = this.state.password;
        this.state.emailValidation = validator.validateEmail(email);
        if (!this.state.emailValidation.valid) {
            this.setState({
                email: email
            });
            return;
        }
        let _this = this;
        axios
            .post(config.BASE_URL + '/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                if (response.data !== null && response.data.auth === true) {
                    _this.setState({
                        isLoggedIn: true
                    }, function () {
                        this.props.dispatch({type: 'SET_USER_TOKEN', accessToken: response.data.token});
                        this.props.dispatch({type: 'SET_LOGGED_IN_STATUS', isLoggedIn: true});
                        localStorage.setItem("loggedIn", true);
                    })
                }


            })
            .catch(function (error) {
                console.log(error);
            });
    };

    delegateClickAction = (source, event) => {
        this.props.execute(source);
    };

    handleForgotPasswordLinkClick = () => {
        this.setState({
            showForgotPasswordModal: true
        });

    };

    constructor(props) {
        super(props);
        this.state = ({
            email: 'sklamgade47@gmail.com',
            password: 'password',
            emailValidation: {valid: true, message: ''},
            passwordValidation: {valid: true, message: ''},
            showForgotPasswordModal:false
        });

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleForgotPasswordLinkClick = this.handleForgotPasswordLinkClick.bind(this);

    }

    render() {
        let allProps = this.props;
        return (
            <div className="internal-container">
                <form className="form-horizontal" method="post" action="#">
                    <div className="form-group">
                        <div className="cols-sm-10">
                            <div className={this.state.emailValidation.valid ? "input-group" : "input-group has-error"}>
                                        <span className="input-group-addon"><i className="fa fa-envelope fa"
                                                                               aria-hidden="true"></i></span>
                                <Input type="text" className="form-control has-error" name="email" id="email"
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

                    <div className="form-group ">
                        <Button type="button"
                                className="btn btn-primary btn-sm btn-block login-button"
                                handleClick={this.handleClick}
                                buttonDisplay="Login"/>
                    </div>
                    <div className="login-register">
                        <ActionLink id="registerLink" displayName="New user? Please sign up"
                                    execute={this.delegateClickAction}/>
                        <hr/>
                        <a href="#"
                           id="forgotPassword"
                           onClick={this.handleForgotPasswordLinkClick}>Forgot password</a>

                        <ForgotPasswordModal show={this.state.showForgotPasswordModal}/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

export default connect(mapDispatchToProps)(LoginForm);