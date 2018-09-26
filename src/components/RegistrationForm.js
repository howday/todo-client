import React from 'react'
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import ActionLink from "./ActionLink";
import {connect} from 'react-redux';

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
        alert('clicked');
        let _this = this;
        axios
            .post("http://18.222.152.73:3000/user", {
                name: /*this.state.name*/'suresh',
                email: /*this.state.email*/'sklamgade47@gmail.com',
                password: /*this.state.password*/'password'
            })
            .then(function (response) {
                if (response.data !== null && response.data.auth === true) {
                    _this.setState({
                        isLoggedIn: true
                    })
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
            });
    };

    delegateClickAction = (source,event) => {
        this.props.execute(source);
    };

    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            email: '',
            password: '',
            password2: ''
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
            <form className="form-horizontal" method="post" action="#" style={allProps.visibility}>
                {this.props.accessToken}
                <div className="form-group">
                    <div className="cols-sm-10">
                        <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa"
                                                                               aria-hidden="true"></i></span>
                            <Input type="text" className="form-control" name="name" id="name"
                                   placeholder="Enter your Name"
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
        )
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.accessToken
    };
}


export default connect(mapStateToProps)(RegistrationForm);