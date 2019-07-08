import React, { Component } from 'react';

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
import Dashboard from './Dashboard';

const route = (isLogged, loginToggle) => {
  return (<Switch>

    <Route exact path="/" render={() => (isLogged ? <Dashboard /> : <Redirect to="/login" />)} />
    <Route path="/login" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={loginToggle}/>)}/>
    <Route path="/signup" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={loginToggle}/>)}/>
    <Route path="/dashboard" render={() => (isLogged ? <Dashboard /> : <Redirect to="/login" />)} />
    <Route path="/myschema" />

  </Switch>)
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    }
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
  }

  toggleLoggedIn() {
    this.setState({ isLogged: true });
    console.log(this.state);
  }

  checkIfLoggedIn() {
    console.log('inside did mount func')
    fetch('/auth/verify', {method:'POST'})
      .then(data => data.json())
      .then(data => {
        this.setState({ isLogged: data.isLoggedIn })
        console.log('inside check if logged in ', this.state.isLogged)
      })
      .catch(e => {
        console.log('no jwt, inside catch e');
        console.log(this.state.isLogged);        
      })
  }

  componentDidMount() {
    console.log('component mounting, about to check jwt');
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <Router>
        {/* invoke route with isLogged */}
        {route(this.state.isLogged, this.toggleLoggedIn)}
      </Router>
    );
  }
}

export default App;
