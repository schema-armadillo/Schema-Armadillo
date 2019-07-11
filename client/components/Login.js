import React, { Component } from 'react';

import '../styles/Login.css';
import {
  Route, Link, BrowserRouter as Router, Redirect,
} from 'react-router-dom';

import styled from 'styled-components';

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 450px;
    padding-top: 150px;
    align-items: center;
    `;

const Input = styled.input`
    width: 375px;
    height: 50px;
    margin: 30px;
    padding: 10px;
`;



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
    };

    this.handleChangeLoginEmail = this.handleChangeLoginEmail.bind(this);
    this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChangeLoginEmail(event) {
    this.setState({ loginEmail: event.target.value });
  }

  handleChangeLoginPassword(event) {
    this.setState({ loginPassword: event.target.value });
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
        if (res.status === 401) {
          throw new Error('Invalid credentials. Please try again.');
        } else return res.json();
      })
      .then((result) => {
        alert('Welcome back.')
        this.props.toggleLoggedIn(result);
        this.props.redirectToDashboard();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className='loginContainer'>
        <Form className='loginForm' onSubmit={this.handleLoginSubmit}>
          {/* <img className="armadillo" src={armadillo} alt="armadillo logo" /> */}
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
        </Form>
      </div>
    );
  }
}

export default Login;
