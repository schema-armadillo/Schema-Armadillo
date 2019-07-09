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
import Dashboard from './Dashboard';

const route = (isLogged, loginToggle, getUserSchemaArr, userSchemaArr, deleteCookie) => {
  return (<Switch>

    <Route exact path="/" render={() => (isLogged ? <Dashboard userSchemaArr={userSchemaArr}/> : <Redirect to="/login" />)} />
    <Route path="/login" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={loginToggle} getUserSchemaArr={getUserSchemaArr}/>)}/>
    <Route path="/signup" render={() => (isLogged ? <Redirect to="/dashboard" /> : <Login isLoggedIn={isLogged} loginToggle={loginToggle} getUserSchemaArr={getUserSchemaArr}/>)}/>
    <Route path="/dashboard" render={() => (isLogged ? <Dashboard userSchemaArr={userSchemaArr} deleteCookie={deleteCookie}/> : <Redirect to="/login" />)} />
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
    this.setState({userSchemaArr});
  }

  toggleLoggedIn(result) {
    // JUST FOR THE SAKE OF DEMO
    const userSchemaArr = [...this.state.userSchemaArr];
    // undefined check, handles create user
    if(result.userSchema !== undefined) result.userSchema.forEach(el => userSchemaArr.push(el));
    this.setState({isLogged: true, userSchemaArr});
    // REVIEW THIS CODE HERE

    // this.setState({ isLogged: true });
    // console.log(this.state);
  }

  checkIfLoggedIn() {
    console.log('inside did mount func')
    //checks the jwt
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
        {route(this.state.isLogged, this.toggleLoggedIn, this.getUserSchemaArr, this.state.userSchemaArr, this.deleteCookie)}
      </Router>
    );
  }
}

export default App;
