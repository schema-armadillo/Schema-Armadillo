import React, { Component } from "react";
import ".././styles/KeyValue.css";
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
        this.state = {
            selectedOption: null,
            value: '',
            required: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
    }


    handleSubmit(event) {
        console.log('state on submit ', this.state)
        this.props.updateRow(this.state.value, this.state.selectedOption.label, this.state.required)
        this.props.newRow();
        console.log('handle submit ', this.props.rows)
        event.preventDefault();
    }

    handleChange(selectedOption) {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    handleChangeKey(event) {
        this.setState({ value: event.target.value })
    }

    handleInputChange(event) {
        this.setState({ required: true })
    }

    render() {
        console.log('rendering row ', this.props.rows)
        const { selectedOption } = this.state;
        return (
            <div className="rowDiv">
                <form className="rowForm" onSubmit={this.handleSubmit} >
                    <input className="key" type="text" placeholder="key" value={this.state.value} onChange={this.handleChangeKey} />
                    <Select className="select"
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={typeOptions}
                        isClearable='true'
                        isSearchable='true'
                        closeMenuOnSelect='true'
                    />
                    <label>
                        Required
                        <input
                            name="required"
                            type="checkbox"
                            checked={this.state.required}
                            onChange={this.handleInputChange} />
                    </label>
                    <input className="newRowButton" type="submit" value="new row" />
                </form>
            </div>
        );
    }

}

export default KeyValue;