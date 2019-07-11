import React from 'react';
import styled from 'styled-components';
import '../styles/Login.css';

const Form = styled.form`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 600px;
    padding-top: 150px;
    align-items: center;
    `;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupEmail: '',
      signupPassword: '',
    }

    this.handleChangeSignupEmail = this.handleChangeSignupEmail.bind(this);
    this.handleChangeSignupPassword = this.handleChangeSignupPassword.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }


  handleChangeSignupEmail(event) {
    this.setState({ signupEmail: event.target.value });
  }

  handleChangeSignupPassword(event) {
    this.setState({ signupPassword: event.target.value });
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
        this.props.setUsername(email);
        this.props.redirectToDashboard();
      })
      .catch(err => console.log('login fetch error', err));
  }


  render() {
    return (
      <Form className='signupForm'>
        <h1 className='signup'>Signup</h1>
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
        <input className='signupButton' type='submit' value='Yeehaw!' onClick={this.handleSignupSubmit} />
        <button href='https://github.com/login/oauth/authorize?client_id=a47e12225465438143f6&redirect_uri=http://localhost:3000/github&scope=user:email'>
          Signup With Github
        </button>
        <br />
        <button onClick={this.props.handleGoogleOAuth}>Signup with Google</button>
      </Form >
    );
  }
}

export default Signup;