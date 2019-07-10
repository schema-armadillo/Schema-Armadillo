import React from 'react';

function setNewKeyValueTable(schema, setKeyValueTable) {
  fetch(`/api/schema/${schema.schema_id}`)
    .then(data => data.json())
    .then((data) => {
      setKeyValueTable({
        schemaName: schema.schema_name,
        rows: data.map(row => ({
          key: row.key,
          type: row.type,
          options: {
            required: row.required_check,
            unique: row.unique_check,
          },
        })),
      });
    })
    .catch(err => console.log('error in getSchemaData', err));
}

const SchemaStorage = ({ userSchemaArr, setKeyValueTable }) => {
  const schemas = userSchemaArr.map((schema, i) => (
    <button key={`schema${i}`} type="button" onClick={() => setNewKeyValueTable(schema, setKeyValueTable)}>
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
