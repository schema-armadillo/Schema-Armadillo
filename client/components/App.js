import React, { Component } from 'react';
import '.././styles/App.css';
import { hot } from 'react-hot-loader';
import {
  Route,
  Link,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <>
        <div>Hey, this is working!</div>
        <Router>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/dashboard' />
          <Route path='/myschema' />
        </Router>
      </>
    );
  }
}

export default App;
