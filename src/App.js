import React, {Component} from 'react';
import './components/css/formStyle.css'
import 'jquery'
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import TodoTable from './components/TodoTable'
import connect from "react-redux/es/connect/connect";

var data = [
    {id: 1, name: 'Gob', value: '2'},
    {id: 2, name: 'Buster', value: '5'},
    {id: 3, name: 'George Michael', value: '4'}
];

class App extends Component {

    toggleVisibility = (source, e) => {
        console.log('Clicked from : ' + source);

        let registerDisplay = 'none';
        let loginDisplay = 'block';

        if (source === 'registerLink') {
            registerDisplay = 'block';
            loginDisplay = 'none';
        }
        this.setState({
            registerVisibility: {display: registerDisplay},
            loginVisibility: {display: loginDisplay}
        })
    };

    componentDidMount = () => {
        setInterval(() => {
                this.setState({date: new Date()});
            }, 1000
        );
    };

    constructor(props) {
        super(props);
        this.state = ({
            email: '',
            password: '',
            doRegister: false,
            loginVisibility: {display: 'block'},
            registerVisibility: {display: 'none'},
            date: new Date()
        });

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    render() {
        return (
            <div className="container">
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
                            this.props.isLoggedIn === false ? <LoginForm visibility={this.state.loginVisibility}
                                                                         execute={this.toggleVisibility}/> : null

                        }

                        <RegistrationForm visibility={this.state.registerVisibility} execute={this.toggleVisibility}/>
                        {
                            this.props.isLoggedIn ? <TodoTable data={data}/> : null
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
        todoData: state.todoData

    }
}


export default connect(mapStateToProps)(App);
