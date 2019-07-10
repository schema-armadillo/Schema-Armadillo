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
    this.setState({ loginEmail: event.target.value });
  }

  handleChangeLoginPassword(event) {
    this.setState({ loginPassword: event.target.value });
  }

  handleChangeSignupEmail(event) {
    this.setState({ signupEmail: event.target.value });
  }

  handleChangeSignupPassword(event) {
    this.setState({ signupPassword: event.target.value });
  }

  handleGithubSignIn(event) {

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


  // THIS NEEDS TO BE DONE
  handleSignupSubmit(event) {

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
        this.props.toggleLoggedIn(obj);
        this.props.redirectToDashboard();
      })
      .catch(err => console.log('login fetch err ', err));
  }

  handleGoogleOAuth(event) {
    console.log(`CLICKED THE GOOGLE AUTH BUTTON`);
    event.preventDefault();
    const metaData = {
      'method': 'GET',
      'Content-Type': 'application/json',
      'Accept': 'text/html'
    }

    fetch('/google/googleInit', metaData)
      .then(response => {
        window.location = `http://localhost:3000/google/googleInit`
      })
      .catch(err => console.error(err))

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
            <a href='https://github.com/login/oauth/authorize?client_id=a47e12225465438143f6&redirect_uri=http://localhost:3000/github&scope=user:email'> Sign In With Github </a>
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
        <div>
          <button onClick={this.handleGoogleOAuth}>GOOGLE OAUTH</button>
          <a href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=387435863357-nrvmhlof3oo1hgbeviticr0hc35nib90.apps.googleusercontent.com&response_type=code&scope=openid%20email&redirect_uri=http://localhost:3000/dashboard`}>OAUTH2</a>
        </div>
      </div>
    );
  }
}

export default Login;
