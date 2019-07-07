import React, { Component } from "react";
import ".././styles/Dashboard.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import styled from 'styled-components'
import KeyValue from './KeyValue'



class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    handleSubmit(event) {
        console.log('A form was submitted:');
        event.preventDefault();
    }

    render() {

        return (
            <div>
                <KeyValue />
                <input className="submit" type="submit" value="Submit" />
            </div >
        );
    }

}

export default Dashboard;