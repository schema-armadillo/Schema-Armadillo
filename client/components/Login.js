import React, { Component } from 'react';

import '../styles/Login.css';
import { hot } from 'react-hot-loader';
import {
  Route, Link, BrowserRouter as Router, Redirect,
} from 'react-router-dom';

import styled from 'styled-components';
import armadillo from '../Armadillo-icon.jpg';

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
      signupEmail: '',
      signupPassword: '',
    };

    this.handleChangeLoginEmail = this.handleChangeLoginEmail.bind(this);
    this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
    this.handleChangeSignupEmail = this.handleChangeSignupEmail.bind(this);
    this.handleChangeSignupPassword = this.handleChangeSignupPassword.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }


  // TODO: NEED TO MODULARIZE, MORE DRY

  handleChangeLoginEmail(event) {
    console.log(event.target.value);
    this.setState({ loginEmail: event.target.value });
  }

  handleChangeLoginPassword(event) {
    this.setState({ loginPassword: event.target.value });
  }

  handleChangeSignupEmail(event) {
    console.log(event.target.value);
    this.setState({ signupEmail: event.target.value });
  }

  handleChangeSignupPassword(event) {
    this.setState({ signupPassword: event.target.value });
  }

  handleLoginSubmit(event) {

    console.log(`A login was submitted: ${this.state.loginEmail}`);
    console.log(`A login was submitted: ${this.state.loginPassword}`);
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
        console.log(res.status);
        if (res.status === 401) {
          throw new Error('Invalid credentials. Please try again.');
        } else return res.json();
      })
      .then((result) => {
        alert('Welcome back.')
        console.log('Login.js => handleLoginSubmit => rows',result);
        
        console.log('Login.js => handleLoginSubmit => loginToggle')
        this.props.loginToggle(result);
        console.log('Login.js => handleLoginSubmit => getUserSchemaArr')
        // this.props.getUserSchemaArr(result);

      })
      .catch(err => {
        console.error(err)
        // alert('Invalid credentials. Please try again.')
        // console.log('login fetch err ', err)
      });
  }


  // THIS NEEDS TO BE DONE
  handleSignupSubmit(event) {

    console.log(`A login was submitted: ${this.state.signupEmail}`);
    console.log(`A login was submitted: ${this.state.signupPassword}`);
    event.preventDefault();

    const { signupEmail: email, signupPassword: password } = this.state;
    const signupBody = { email, password };

    fetch('/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupBody),
    })
      .then(data => data.json())
      .then((obj) => {
        alert("Welcome");
        console.log(obj);
        this.props.loginToggle(obj);
      })
      .catch(err => console.log('login fetch err ', err));
  }

  render() {
    return (

      <div className='loginContainer'>
        <div>
          <Form className='signupForm' onSubmit={this.handleSignupSubmit}>
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
          </Form>
        </div>
        <div>
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
      </div>
    );
  }
}

export default Login;
