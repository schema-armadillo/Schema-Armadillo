import React, { Component } from "react";
import ".././styles/Dashboard.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import styled from 'styled-components'
import KeyValue from './KeyValue'



class Dashboard extends Component {

    constructor(props) {
        super(props),
            this.state = {
                value: '',
                rows: [
                    {
                        key: null,
                        type: null,
                        required: false,
                    },
                ],

            },
            this.newRow = this.newRow.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        console.log('A form was submitted: ', this.state);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    };

    newRow(event) {
        let newRows = [...this.state.rows]
        newRows.push({
            key: null,
            type: null,
            required: false,
        })
        this.setState({ rows: newRows })
    }

    render() {
        let rows = []
        for (let i = 0; i < this.state.rows.length; i++) {
            rows.push(<KeyValue data={this.state.rows[i]} newRow={this.newRow} rows={this.state.rows} />)
        }

        return (

            <div>
                <input className="schemaName" type="text" value="Schema Name" value={this.state.value} onChange={this.handleChange} />
                <div className="container">
                    <div className="form">
                        {rows}
                    </div>
                    <div className="optionsKey">
                        <h1>Options Key</h1>
                    </div>
                    <div>
                        <input className="submit" type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard;