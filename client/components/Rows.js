import React from 'react';
import KeyValue from './KeyValue';

function Rows(props) {
  let rows = [];
  for (let i = 0; i < props.rows.length; i++) {
    rows.push(
      <KeyValue
        key={`row${i}`}
        rowIndex={i}
        deleteRow={props.deleteRow}
        handleChangeRequired={props.handleChangeRequired}
        handleChangeUnique={props.handleChangeUnique}
        handleChangeKey={props.handleChangeKey}
        handleChangeType={props.handleChangeType}
        rowData={props.rows[i]}
      />
    );
  }
  return (
    <div className='form'>
      {rows}
    </div>
  )
}

export default Rows

