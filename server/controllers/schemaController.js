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

        const queryText =
          'INSERT INTO Schemas (user_id, schema_name, schema_id, key, type, options_check, unique_check, required_check) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        keys.forEach((row, idx) => {
          // iterate thru keys to create rows in the table

          const { key, type } = row;
          // see if there are options to be added to the table
          const areThereOptions = row.hasOwnProperty('options');
          // if options is false, this will already be false. if not, have to check if unique and required exist
          const isUnique =
            areThereOptions && row.options.hasOwnProperty('unique')
              ? row.options.unique
              : false;
          const isRequired =
            areThereOptions && row.options.hasOwnProperty('required')
              ? row.options.required
              : false;
          // init queryValues array to pass into query
          const queryValues = [
            userId,
            schemaName,
            200,
            key,
            type,
            areThereOptions,
            isUnique,
            isRequired
          ];
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
      }
    );
  },
  getSchema: (req, res, next) => {
    // expecting to receive user_id and schema_id from req.body
    const { user_id, schema_id } = req.body;
    // query the table using user_id and schema_id
    pool.query(
      'SELECT * FROM Schemas WHERE user_id=$1 AND schema_id=$2',
      [user_id, schema_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from getSchema' });
        }
        console.log('schemaController => getSchema', result.rows);
        return res.status(200).json(result.rows);
      }
    );
  },
  updateSchema: (req, res, next) => {
    // expecting to receive user_id and post_id and other fields that we want to update from req.body
    const {
      user_id,
      schema_id,
      schema_name,
      key,
      type,
      options_check,
      unique_check,
      required_check
    } = req.body;

    // query for the table
    pool.query(
      'UPDATE Schemas SET schema_name=$1 key=$2 type=$3 options_check=$4 unique_check=$5 required_check=$6 WHERE user_id=$7 AND schema_id=$8',
      [
        schema_name,
        key,
        type,
        options_check,
        unique_check,
        required_check,
        user_id,
        schema_id
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from updateSchema' });
        }
        console.log('schemaController => updateSchema', result.rows);
        return res.status(200).json(result.rows);
      }
    );
  },
  deleteSchema: (req, res, next) => {
    // expecting to receive user_id and post_id to find the rows that we want to delete
    const { user_id, schema_id } = req.body;

    // query for the table
    pool.query(
      'DELETE FROM Schemas WHERE user_id=$1 AND schema_id=$2',
      [user_id, schema_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from deleteSchema' });
        }
        console.log('schemaController => deleteSchema', result.rows);
        return res.status(200).json(result.rows);
      }
    );
  }
};

module.exports = schemaController;
