import React, { Component } from 'react';

import '../styles/App.css';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

const autoBind = require('auto-bind');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    }

    autoBind(this);
  }

  toggleLoggedIn() {
    this.setState({ isLogged: true });
  }

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    // checks the jwt
    fetch('/auth/verify', { method: 'POST' })
      .then(data => data.json())
      .then(({ isLoggedIn }) => this.setState({ isLogged: isLoggedIn }))
      .catch(() => {
        console.log('no jwt, inside catch e');
        console.log(this.state.isLogged);
      });
  }

  render() {
    const { isLogged } = this.state;
    const route = (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={this.toggleLoggedIn} />)} />
        <Route path="/signup" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Signup isLoggedIn={isLogged} loginToggle={this.toggleLoggedIn} />)} />
        <Route path="/dashboard" render={() => (isLogged ? <Dashboard /> : <Redirect to="/login" />)} />
        <Route path="/myschema" />
      </Switch>
    )

    return (
      <Router>
        {route}
      </Router>
    );
  }
}

export default App;
