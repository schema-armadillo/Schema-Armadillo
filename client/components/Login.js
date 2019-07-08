import React, { Component } from 'react';
import '.././styles/Login.css';
import styled from 'styled-components';
import armadillo from '../Armadillo-icon.jpg';

const Form = styled.form`
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
      email: '',
      password: ''
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    console.log(event.target.value);
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
        console.log(obj);
        this.history.pushState(null, obj.redirecturl);
      })
      .catch(err => console.log('login fetch err ', err));
  }

  render() {
    return (
      <div className='container'>
        <div>
          <Form className='signupForm' onSubmit={this.handleSubmit}>
            <h1 className='signup'>Sign up</h1>
            <input
              className='entry emailField'
              type='text'
              placeholder='email'
            />
            <input
              className='entry passwordField'
              type='password'
              placeholder='password'
            />
            <input className='signupButton' type='submit' value='Yeehaw!' />
          </Form>
        </div>
        <div>
          <Form className='loginForm' onSubmit={this.handleSubmit}>
            {/* <img className="armadillo" src={armadillo} alt="armadillo logo" /> */}
            <h1>Log in to Schema Armadillo</h1>
            <input
              className='entry emailField'
              type='text'
              placeholder='email'
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
            <input
              className='entry passwordField'
              type='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
            <input className='loginButton' type='submit' value='Giddy-up!' />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
