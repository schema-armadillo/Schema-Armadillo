import React, { Component } from "react";
import ".././styles/App.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";


class App extends Component {



    render() {

        return (

            <Router>
                <Route path="/login" />
                <Route path="/signup" />
                <Route path="/dashboard" />
                <Route path="/myschema" />
            </Router>
        )
    }

}

export default App;