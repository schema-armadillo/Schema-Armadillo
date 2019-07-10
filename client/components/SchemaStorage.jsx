import React from 'react';

const SchemaStorage = ({ userSchemaArr }) => {
  const schemas = userSchemaArr.map(schema => (
    <button type="button">
      {schema.schema_name}
    </button>
  ));
  return (
    <div className="optionsKey">
      {schemas}
    </div>
  );
}

export default SchemaStorage;
