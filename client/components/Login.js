import React, { Component } from "react";
import ".././styles/App.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        console.log(event.target.email)
        this.setState({ email: event.target.email });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.password });
    }

    handleSubmit(event) {
        console.log('A login was submitted: ' + this.state.email);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <p>hello!</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" email={this.state.email} onChange={this.handleChangeEmail} />
                    <input type="text" password={this.state.password} onChange={this.handleChangePassword} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}

export default Login;