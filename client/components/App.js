import React, { Component } from 'react';
import Cookies from 'js-cookie';


import '../styles/App.css';
import { hot } from 'react-hot-loader';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const route = (isLogged, loginToggle, getUserSchemaArr, userSchemaArr) => {
  return (<Switch>

    <Route exact path="/" render={() => (isLogged ? <Dashboard userSchemaArr={userSchemaArr} /> : <Redirect to="/login" />)} />
    <Route path="/login" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={loginToggle} getUserSchemaArr={getUserSchemaArr} />)} />
    <Route path="/signup" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Signup isLoggedIn={isLogged} loginToggle={loginToggle} getUserSchemaArr={getUserSchemaArr} />)} />
    <Route path="/dashboard" render={() => (isLogged ? <Dashboard userSchemaArr={userSchemaArr} /> : <Redirect to="/login" />)} />
    <Route path="/myschema" />

  </Switch>)
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSchemaArr: [],
      isLogged: false,
    }
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.getUserSchemaArr = this.getUserSchemaArr.bind(this);
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
  }

  checkIfLoggedIn() {
    //checks the jwt
    fetch('/auth/verify', { method: 'POST' })
      .then(data => data.json())
      .then(data => {
        this.setState({ isLogged: data.isLoggedIn })
      })
      .catch(e => {
        console.log('no jwt, inside catch e');
        console.log(this.state.isLogged);
      })
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }


  render() {
    return (
      <Router>
        {/* invoke route with isLogged */}
        {route(this.state.isLogged, this.toggleLoggedIn, this.getUserSchemaArr, this.state.userSchemaArr)}
      </Router>
    );
  }
}

export default App;
