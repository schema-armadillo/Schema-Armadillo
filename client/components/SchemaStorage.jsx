import React from 'react';
import SchemaButton from './SchemaButton.jsx';

function setNewKeyValueTable(schema, setKeyValueTable) {
  fetch(`/api/schema/${schema.schema_name}`)
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
    .catch(err => console.log('error in settingKeyValueTable', err));
}

const SchemaStorage = ({ userSchemaArr, setKeyValueTable }) => {
  const schemas = userSchemaArr.map((schema, i) => (
    <SchemaButton key={`schema${i}`} schema_name={schema.schema_name} onClick={() => setNewKeyValueTable(schema, setKeyValueTable)} />
  ));
  return (
    <div className="optionsKey">
      {schemas}
    </div>
  );
};

export default SchemaStorage;
