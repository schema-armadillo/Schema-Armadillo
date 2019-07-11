let hello  = {
    result: 'hello',
    schema: {
      schemaName: '',
      rows: [
        {
          key: '',
          type: '',
          options: {
            required: false,
            unique: false
          }
        }
      ]
    },
    userSchemaArr: [],
  };

// INPUT: an object with schemaName (str) and an array of rows
// OUTPUT: big-ass string, to be formatted, of the formatted file name

const sqlCodeMaker = (sqlSchema) => {
    const {schemaName, rows} = sqlSchema;
    let result = ""
    const openingtext = "const { Pool } = require('pg');\nconst pool = new Pool()\n\n"
    result += openingtext
    let openQuery = 'pool.query('
    result += openQuery
    let createTable = `CREATE TABLE IF NOT EXISTS ${schemaName} (\n`
    result = result.concat(createTable)
    const tab = '  ';

    for(let i=0; i<rows.length; i++){
        
    }

    result+= tab
    result+='test'

    return result;
}


console.log(sqlCodeMaker(hello))

module.exports = sqlCodeMaker