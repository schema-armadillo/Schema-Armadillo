import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Login from './Login';
import Nav from './Nav';
import Dashboard from './Dashboard';
import '../styles/App.css';

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

  redirectToLogin() {
    this.setState({ ...this.state, screen: 'login' });
  }

  redirectToDashboard() {
    this.setState({ ...this.state, screen: 'dashboard' });
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <>
        <Nav />
        {this.state.screen === 'dashboard' &&
          <Dashboard
            userSchemaArr={this.userSchemaArr}
            isLogged={this.state.isLogged}
            redirectToLogin={this.redirectToLogin}
          />
        }
        {this.state.screen === 'login' &&
          <Login
            isLoggedIn={this.isLogged}
            toggleLoggedIn={this.toggleLoggedIn}
            getUserSchemaArr={this.getUserSchemaArr}
            redirectToDashboard={this.redirectToDashboard} />
        }
      </>
    );
  }
}

export default App;
