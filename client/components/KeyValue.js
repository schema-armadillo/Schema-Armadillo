import React, { Component } from "react";
import ".././styles/Dashboard.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import styled from 'styled-components'
import Select from 'react-select';

const typeOptions = [
    { value: 'string', label: 'String' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'buffer', label: 'Buffer' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'mixed', label: 'Mixed' },
    { value: 'objectID', label: 'ObjectID' },
    { value: 'array', label: 'Array' },
    { value: 'decimal128', label: 'Decimal128' },
    { value: 'map', label: 'Map' },
]

class KeyValue extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedOption: null };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        console.log('A form was submitted:');
        event.preventDefault();
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="key" type="text" placeholder="key" />
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={typeOptions}
                        isClearable='true'
                        isSearchable='true'
                        closeMenuOnSelect='true'
                    />
                    {/* <select className="typeDrop">
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="buffer">Buffer</option>
                        <option value="boolean">Boolean</option>
                        <option value="mixed">Mixed</option>
                        <option value="objectID">ObjectID</option>
                        <option value="array">Array</option>
                        <option value="decimal128">Decimal128</option>
                        <option value="map">Map</option>
                    </select> */}
                    <label>
                        Required
                        <input
                            name="required"
                            type="checkbox" />
                    </label>
                    <input className="save" type="submit" value="save key" />
                </form>
            </div>
        );
    }

}

export default KeyValue;