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
          // a user must select 'type' so it shouldn't be clearable
          // isClearable='false'
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

export default KeyValue;
