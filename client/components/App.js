import React, { Component } from "react";
import ".././styles/App.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"


class App extends Component {



    render() {

        return (

            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/myschema" />
            </Router>

        )
    }

}

export default App;