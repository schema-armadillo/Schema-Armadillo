import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import Signup from './Signup';
import styled from 'styled-components';

const SAuthentication = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    `;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSchemaArr: [],
      isLogged: false,
      screen: 'dashboard'
    }
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.getUserSchemaArr = this.getUserSchemaArr.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
    this.redirectToSignup = this.redirectToSignup.bind(this);
    this.handleGoogleOAuth = this.handleGoogleOAuth.bind(this);
    //reinit app state
    this.clearAppState = this.clearAppState.bind(this)
  }

  getUserSchemaArr(result) {
    const userSchemaArr = [...this.state.userSchemaArr];
    result.forEach(el => userSchemaArr.push(el));
    this.setState({ userSchemaArr });
  }

  toggleLoggedIn(result) {
    // JUST FOR THE SAKE OF DEMO
    const userSchemaArr = [...this.state.userSchemaArr];
    // undefined check, handles create user
    if (result.userSchema !== undefined) result.userSchema.forEach(el => userSchemaArr.push(el));
    this.setState({ isLogged: true, userSchemaArr });
    // REVIEW THIS CODE HERE

    // this.setState({ isLogged: true });
    // console.log(this.state);
  }

  checkIfLoggedIn() {
    fetch('/auth/verify', { method: 'POST' })
      .then(data => data.json())
      .then(data => {
        this.setState({ isLogged: data.isLoggedIn })
      })
      .catch(e => {
        console.error(e);
      })
  }

  clearAppState() {
    const reinitAppState = {
      userSchemaArr: [],
      isLogged: false,
      screen: 'dashboard'
    }
    this.setState(reinitAppState);
  }

  redirectToLogin() {
    this.setState({ ...this.state, screen: 'login' });
  }

  redirectToDashboard() {
    this.setState({ ...this.state, screen: 'dashboard' });
  }

  redirectToSignup() {
    this.setState({ ...this.state, screen: 'signup' });
  }

  handleGoogleOAuth(event) {
    event.preventDefault();
    fetch('/google/googleInit')
      .then(response => {
        window.location = `http://localhost:3000/google/googleInit`
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <>
        <Nav
          isLogged={this.state.isLogged}
          redirectToLogin={this.redirectToLogin}
          redirectToDashboard={this.redirectToDashboard}
          redirectToSignup={this.redirectToSignup}
        />
        {this.state.screen === 'dashboard' &&
          <Dashboard
            userSchemaArr={this.state.userSchemaArr}
            isLogged={this.state.isLogged}
            redirectToSignup={this.redirectToSignup}
            getUserSchemaArr={this.getUserSchemaArr}
            clearAppState={this.clearAppState}
          />
        }
        <SAuthentication>
          {this.state.screen === 'login' &&
            <Login
              toggleLoggedIn={this.toggleLoggedIn}
              getUserSchemaArr={this.getUserSchemaArr}
              redirectToDashboard={this.redirectToDashboard}
              handleGoogleOAuth={this.handleGoogleOAuth}
            />
          }
          {this.state.screen === 'signup' &&
            <Signup
              toggleLoggedIn={this.toggleLoggedIn}
              redirectToDashboard={this.redirectToDashboard}
              handleGoogleOAuth={this.handleGoogleOAuth}
            />
          }
        </SAuthentication>
      </>
    );
  }
}

export default App;
