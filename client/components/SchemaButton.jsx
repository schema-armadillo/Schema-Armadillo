import React from 'react';

const SchemaButton = ({ onClick, schema_name }) => {
  return (
    <button type="button" onClick={onClick}>
      {schema_name}
    </button>
  )
}

export default SchemaButton;
