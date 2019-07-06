import React, { Component } from "react";
import ".././styles/Signup.css";
import { hot } from "react-hot-loader";
import styled from 'styled-components'

class Signup extends Component {
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
                <Form onSubmit={this.handleSubmit}>
                    <h1>Schema Armadillo</h1>
                    <input className="emailField" type="text" placeholder="email" email={this.state.email} onChange={this.handleChangeEmail} />
                    <input className="passwordField" type="password" placeholder="password" password={this.state.password} onChange={this.handleChangePassword} />
                    <input className="submit" type="submit" value="Sign up" />
                    <a href="/" className="login">login</a>
                </Form>
            </div>
        );
    }

}

export default Signup;