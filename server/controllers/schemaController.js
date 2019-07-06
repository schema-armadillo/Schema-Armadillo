const pool = require('./database');

const schemaController = {
  createSchema: (req, res, next) => {
    // extract all the form inputs. not there yet
    const { schemaName, keys } = req.body;
    console.log('off the body: ', schemaName, keys);

    // check if table has already been made
    pool.query(
      // have to add more options
      'CREATE TABLE IF NOT EXISTS Schemas (user_id INT, schema_name VARCHAR (50), schema_id INT, key VARCHAR(50), type VARCHAR(50), options_check BOOLEAN DEFAULT FALSE, unique_check BOOLEAN DEFAULT FALSE, required_check BOOLEAN DEFAULT FALSE)',
      (err, result) => {
        if (err) {
          console.error('error in adding table.');
          throw new Error(err);
        }

        // add to table once it has been created
        console.log('CREATE TABLE schema', result);

        // populate the table
        // iterate thru keys to create rows in the table

        const queryText = 'INSERT INTO Schemas (user_id, schema_name, schema_id, key, type, options_check, unique_check, required_check) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        keys.forEach((row, idx) => {
          const {
            userId,
            schemaId,
            key,
            type,
            areThereOptions,
            unique,
            required,
          } = row;
          const queryValues = [userId, schemaName, schemaId, key, type, areThereOptions, unique, required];
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
