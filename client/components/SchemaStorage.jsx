import React from 'react';

function getSchemaData(schema) {
  fetch(`/api/schema/${schema.schema_id}`)
    .then(data => data.json())
    .then(console.log)
    .catch(err => console.log('error in getSchemaData', err));
}

const SchemaStorage = ({ userSchemaArr }) => {
  const schemas = userSchemaArr.map((schema, i) => (
    <button key={`schema${i}`} type="button" onClick={() => getSchemaData(schema)}>
      {schema.schema_name}
    </button>
  ));
  return (
    <div className="optionsKey">
      {schemas}
    </div>
  );
};

export default SchemaStorage;
