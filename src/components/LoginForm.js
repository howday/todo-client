import React from 'react'
import Input from "./Input";
import Button from "./Button";
import ActionLink from "./ActionLink";
import axios from "axios";
import config from '../config'
import {connect} from 'react-redux';

class LoginForm extends React.Component {

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

    handleClick = (event) => {
        let _this = this;
        axios
            .post(config.BASE_URL + '/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(function (response) {
                if (response.data !== null && response.data.auth === true) {
                    _this.setState({
                        isLoggedIn: true
                    }, function () {
                        this.props.dispatch({type: 'SET_USER_TOKEN', accessToken: response.data.token});
                        this.props.dispatch({type: 'SET_LOGGED_IN_STATUS', isLoggedIn: true});
                        localStorage.setItem("loggedIn", true);
                        console.log(response);
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

    constructor(props) {
        super(props);
        this.state = ({
            email: 'sklamgade47@gmail.com',
            password: 'password'
        });

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }

    render() {
        let allProps = this.props;
        return (
            <form className="form-horizontal" method="post" action="#">
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

                <div className="form-group ">
                    <Button type="button"
                            className="btn btn-primary btn-sm btn-block login-button"
                            handleClick={this.handleClick}
                            buttonDisplay="Login"/>
                </div>
                <div className="login-register">
                    <ActionLink id="registerLink" displayName="New user? Please sign up"
                                execute={this.delegateClickAction}/>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

export default connect(mapDispatchToProps)(LoginForm);