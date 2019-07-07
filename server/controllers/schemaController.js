const pool = require('./database');

const schemaController = {
  createSchema: (req, res, next) => {
    // extract all the form inputs. not there yet
    // TODO NEED: userId, SchemaID
    // const testUserId = 999;
    // const testSchemaId = 999;

    // needs to be assigned something off body
    let user_id;
    // needs to be assigned something off body
    let schema_id;
    // need to establish body format for parsing.
    const { schemaName, keys } = req.body;


    // check if table has already been made
    pool.query(
      'CREATE TABLE IF NOT EXISTS Schemas (user_id INT, schema_name VARCHAR (50), schema_id INT, key VARCHAR(50), type VARCHAR(50), options_check BOOLEAN DEFAULT FALSE, unique_check BOOLEAN DEFAULT FALSE, required_check BOOLEAN DEFAULT FALSE)',
      (err, result) => {
        if (err) {
          console.error('error in adding table.');
          throw new Error(err);
        }

        // add to table once it has been created
        // console.log('CREATE TABLE schema', result);

        // populate the table

        const queryText = 'INSERT INTO Schemas (user_id, schema_name, schema_id, key, type, options_check, unique_check, required_check) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        keys.forEach((row, idx) => {
        // iterate thru keys to create rows in the table

          const {
            key,
            type,
          } = row;
          // see if there are options to be added to the table
          const areThereOptions = row.hasOwnProperty('options');
          // if options is false, this will already be false. if not, have to check if unique and required exist
          const isUnique = areThereOptions && row.options.hasOwnProperty('unique') ? row.options.unique : false;
          const isRequired = areThereOptions && row.options.hasOwnProperty('required') ? row.options.required : false;
          // init queryValues array to pass into query
          const queryValues = [userId, schemaName, 200, key, type, areThereOptions, isUnique, isRequired];
          console.log('query values here: ', queryValues);
          pool.query(queryText, queryValues, (rowErr, result) => {
            if (rowErr) {
              console.log('error in adding row to DB');
              throw new Error(rowErr);
            }
            console.log('Row added to table.');
          });
        });
        return next();
      },
    );
  },
};

module.exports = schemaController;
