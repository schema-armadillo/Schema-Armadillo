import React, { Component } from "react";
import ".././styles/Login.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import styled from 'styled-components'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 450px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    height: 450px;
    padding-top: 150px;
    align-items: center;
    `

const Input = styled.input`
    width: 375px;
    height: 50px;
    margin: 30px;
    padding: 10px;
`


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
        console.log(event.target.value)
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        console.log('A login was submitted: ' + this.state.email);
        console.log('A login was submitted: ' + this.state.password);
        event.preventDefault();
        fetch('/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(data => data.json())
            .then(obj => {
                console.log(obj)
                this.history.pushState(null, obj.redirecturl)
            })
            .catch(err => console.log('login fetch err ', err))
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Schema Armadillo</h1>
                    <input className="emailField" type="text" placeholder="email" value={this.state.email} onChange={this.handleChangeEmail} />
                    <input className="passwordField" type="password" placeholder="password" value={this.state.password} onChange={this.handleChangePassword} />
                    <input className="submit" type="submit" value="Login" />
                    <a href="./signup" className="signup">sign up</a>
                </Form>
            </div>
        );
    }

}

export default Login;