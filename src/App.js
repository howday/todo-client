import React, {Component} from 'react';
import './components/css/formStyle.css'
import 'jquery'
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import TodoTable from './components/TodoTable'
import connect from "react-redux/es/connect/connect";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


class App extends Component {

    toggleVisibility = (source, e) => {
        this.setState({
            showRegistration : source === 'registerLink',
            showLogin : source === 'loginLink'
        });
    };

    componentDidMount = () => {
        setInterval(() => {
                this.setState({date: new Date()});
            }, 1000
        );
    };

    closeModal = () => {
        this.setState({show: false});
    };

    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            doRegister: false,
            date: new Date(),
            showRegistration: false,
            showLogin: true,
            show: true
        });

        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        return (
            <div className="container">
                <ToastContainer/>
                <div className="row main">
                    <div className="panel-heading">
                        <div className="panel-title text-center">
                            <h1 className="title">My TODOs </h1>
                            <h3>It is {this.state.date.toLocaleTimeString()}.</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="main-login main-center">
                        {
                            (this.props.isLoggedIn === false && this.state.showLogin) ? <LoginForm
                                execute={this.toggleVisibility}/> : null

                        }

                        {
                            this.state.showRegistration === true ?
                                <RegistrationForm execute={this.toggleVisibility}/> : null
                        }

                        {
                            this.props.isLoggedIn ? <TodoTable/> : null
                        }
                    </div>
                </div>
            </div>

        );
    }


}


function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
        todoData: state.todoData,
        isLoading: state.isLoading

    }
}


export default connect(mapStateToProps)(App);
