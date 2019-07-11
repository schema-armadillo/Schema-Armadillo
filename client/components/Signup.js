import React, { Component } from 'react';

import '../styles/Login.css'
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';

const autoBind = require('auto-bind');

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 450px;
    align-items: center;
    `;

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupEmail: '',
      signupPassword: '',
      redirectLogin: false,
    }

    autoBind(this);
  }

  handleChangeSignupEmail(event) {
    this.setState({ signupEmail: event.target.value });
  }
  handleChangeSignupPassword(event) {
    this.setState({ signupPassword: event.target.value });
  }
  handleRedirectLogin(event) {
    this.setState({ redirectLogin: true })
  }
  handleSignupSubmit(event) {
    event.preventDefault();
    const { signupEmail: email, signupPassword: password } = this.state;
    const signupBody = { email, password };

    fetch('/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupBody)
    })
      .then(function (data) {
        if (data.status === 200) return data.json;
        else throw new Error('error in signing user up')
        // refactored signup duplicate bug
      })
      .then((obj) => {
        alert("Welcome");
        this.props.loginToggle(obj)
      })
      .catch(() =>
        alert('username taken')
      )
  }

  render() {
    if (this.state.redirectLogin) return (
      <Redirect to="/login" />
    )

    return (
      <div className='SignupContainer'>
        <Form className='signupForm' onSubmit={this.handleSignupSubmit}>
          <img id="armadillo" src="Armadillo-icon.png" alt="armadillo" />
          <h1 className='signup'>Sign up</h1>
          <input
            className='entry emailField'
            type='text'
            placeholder='email'
            value={this.state.signupEmail}
            onChange={this.handleChangeSignupEmail}
          />
          <input
            className='entry passwordField'
            type='password'
            placeholder='password'
            value={this.state.signupPassword}
            onChange={this.handleChangeSignupPassword}
          />
          <input className='signupButton' type='submit' value='Yeehaw!' />
          <button id="signup-button" onClick={this.handleRedirectLogin}>Log in</button>
        </Form>
      </div>
    )
  }
}

export default Signup;
