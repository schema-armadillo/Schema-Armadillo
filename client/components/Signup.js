import React, { Component } from 'react';

import '../styles/Login.css'

import styled from 'styled-components';

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            signupEmail: '',
            signupPassword: '',
        }

    this.handleChangeSignupEmail = this.handleChangeSignupEmail.bind(this);
    this.handleChangeSignupPassword = this.handleChangeSignupPassword.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    }
    handleChangeSignupEmail(event){
        this.setState({signupEmail: event.target.value});
    }
    handleChangeSignupPassword(event){
        this.setState({signupPassword: event.target.value});
    }

    handleSignupSubmit(event){
        event.preventDefault();
        const {signupEmail: email, signupPassword: password } = this.state;
        const signupBody = {email, password};

        fetch('/auth/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupBody)
        })
          .then(data => data.json())
          .then((obj) => {
              alert("Welcome");
              this.props.loginToggle(obj)
          })
          .catch(alert("Username already taken"))
    }
    render() {
        return (
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
        )
    }
}

export default Signup;