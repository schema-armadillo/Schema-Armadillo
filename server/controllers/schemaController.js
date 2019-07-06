const pool = require('./database');

const schemaController = {
  createSchema: (req, res, next) => {
    // extract all the form inputs. not there yet
    const { schemaName } = req.body;

    // check if table has already been made
    pool.query(
      // have to add more options
      'CREATE TABLE IF NOT EXISTS Schemas (user_id INT, schema_name VARCHAR (50), schema_id INT, key VARCHAR(50), type VARCHAR(50), options, BOOLEAN, unique BOOLEAN);',
      (err, result) => {
        if (err) return console.error(err);

        // add to table once it has been created
        console.log('CREATE TABLE schema', result);

        // populate the table
        // iterate thru keys to create rows in the table
        pool.query(
          `INSERT INTO ${schemaName} (user_id, schema_name, schema_id, key, type, options, unique) values ($1, $2, $3, $4, $5, $6, $7)`,
        );
      },
    );
  },
};

module.exports = schemaController;
