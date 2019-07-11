import React from 'react';


function SchemaName(props) {
  return (
    <div className='schemaName'>
      <input
        type='text'
        placeholder='Schema Name'
        value={props.schemaName}
        onChange={props.handleSchemaName}
      />
      <br />
    </div>
  );
}

export default SchemaName;
