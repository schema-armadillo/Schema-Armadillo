import React, { Component } from 'react';
import '.././styles/KeyValue.css';
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
  { value: 'map', label: 'Map' }
];

const KeyValue = ({
  rowData,
  rowIndex,
  handleChangeKey,
  handleChangeRequired,
  handleChangeUnique,
  handleChangeType,
  deleteRow
}) => {
  return (
    <div className='rowDiv'>
      <form className='rowForm'>
        <input
          className='key'
          type='text'
          placeholder=''
          value={rowData.key}
          onChange={e => handleChangeKey(e, rowIndex)}
        />
        <Select
          className='select'
          value={{
            label: rowData.type
          }}
          onChange={e => handleChangeType(e, rowIndex)}
          options={typeOptions}
          isSearchable='true'
          closeMenuOnSelect='true'
        />
        <label className='checkbox'>
          <input
            name='required'
            type='checkbox'
            checked={rowData.options.required}
            onChange={e => handleChangeRequired(e, rowIndex)}
          />
        </label>
        <label className='checkbox'>
          <input
            name='unique'
            type='checkbox'
            checked={rowData.options.unique}
            onChange={e => handleChangeUnique(e, rowIndex)}
          />
        </label>
        <button
          className='deleteButton'
          onClick={e => {
            deleteRow(rowIndex);
            e.preventDefault();
          }}
        >
          Delete Row
        </button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default KeyValue;
=======
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
        console.log(`Option selected:` , selectedOption);
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
               <table>
                   <tr >
                       <td>
                            <form className="rowForm" onSubmit={this.handleSubmit} >                                                
                                <input className="key" type="text" placeholder="key" value={this.state.value} onChange={this.handleChangeKey} />
                                <Select className="select"
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={typeOptions}
                                    isClearable='true'
                                    isSearchable='true'
                                    closeMenuOnSelect='true' > 
                                </Select>                                   
                                                                
                                <label>
                                        Required
                                        <input
                                            name="required"
                                            type="checkbox"
                                            //checked={this.state.required}
                                            onChange={this.handleInputChange} />
                                    </label>
                                    <input className="newRowButton" type="submit" value="new row" />
                            </form>
                     </td>  
                </tr>
                </table>
            </div>
        );
    }

}

export default KeyValue;
>>>>>>> 7d0e82d3694d68b5b507f16b24c3a03b6454d73d
