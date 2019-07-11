import React from 'react';
import styled from 'styled-components';

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
        this.props.redirectToDashboard();
      })
      .catch(err => console.log('login fetch err ', err));
  }


  render() {
    return (
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
    );
  }
}

export default Signup;