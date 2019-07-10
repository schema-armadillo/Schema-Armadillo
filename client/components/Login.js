import React, { Component } from 'react';

import '../styles/Login.css';
import { hot } from 'react-hot-loader';
import {
  Route, Link, BrowserRouter as Router, Redirect,
} from 'react-router-dom';

import styled from 'styled-components';

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 450px;
    align-items: center;
    `;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      redirectSignup: false,
    };

    this.handleChangeLoginEmail = this.handleChangeLoginEmail.bind(this);
    this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupButton = this.handleSignupButton.bind(this);
  }


  // TODO: NEED TO MODULARIZE, MORE DRY

  handleChangeLoginEmail(event) {
    this.setState({ loginEmail: event.target.value });
  }

  handleChangeLoginPassword(event) {
    this.setState({ loginPassword: event.target.value });
  }

  handleSignupButton() {
    this.setState({ redirectSignup: true })
  }

  handleLoginSubmit(event) {

    event.preventDefault();

    const { loginEmail: email, loginPassword: password } = this.state;
    const loginBody = { email, password };

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginBody),
    })
      .then(res => {
        if (res.status === 401 || res.status == 500) {
          alert('Oops. Wrong username or password. Please try again')
          throw new Error('Invalid credentials. Please try again.');
        }
        else return res.json();
      })
      .then((result) => {
        this.props.loginToggle(result);
      })
  }

  render() {
    if (this.state.redirectSignup) return (
      <Redirect to='/signup' />
    )
    return (
      <div className='loginContainer'>
        <Form className='loginForm' onSubmit={this.handleLoginSubmit}>
          <img id="armadillo" src="Armadillo-icon.png" alt="armadillo" />
          <h1>Log in to Schema Armadillo</h1>
          <input
            className='entry emailField'
            type='text'
            placeholder='email'
            value={this.state.loginEmail}
            onChange={this.handleChangeLoginEmail}
          />
          <input
            className='entry passwordField'
            type='password'
            placeholder='password'
            value={this.state.loginPassword}
            onChange={this.handleChangeLoginPassword}
          />
          <input className='loginButton' type='submit' value='Giddy-up!' />
          <button id="signup-button" onClick={this.handleSignupButton}>Signup</button>
        </Form>
      </div>
    );
  }
}

export default Login;
