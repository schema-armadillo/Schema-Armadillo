const pool = require('./database');
const querystring = require('query-string')

const schemaController = {
  createSchemaId: (req, res, next) => {
    pool.query(`CREATE TABLE IF NOT EXISTS Schema_IDs (schema_id SERIAL PRIMARY KEY, schema_name VARCHAR(50), user_id INT)`, (err, result) => {
      if (err) {
        console.error('error in creating schema_id table');
        throw new Error(err);
      }

      const { schemaName } = req.body;
      const { user_id } = res.locals;
      res.locals.schema_name = schemaName
      pool.query(`INSERT INTO Schema_IDs (user_id, schema_name) VALUES ('${user_id}', '${schemaName}') RETURNING *`, (err, result) => {
        if (err) {
          console.error('Error in adding table to DB');
          throw new Error(err);
        }
        res.locals.schema_id = result.rows[0].schema_id;
        return next();
      })
    })
  },
  createSchema: (req, res, next) => {
    // extract all the form inputs. not there yet
    // TODO NEED: userId, SchemaID
    // const testUserId = 999;
    // const testSchemaId = 999;

    // needs to be assigned something off body
    // let user_id;
    // THIS WILL BE AUTO GENERATED: needs to be assigned something off body
    const { schema_id, user_id } = res.locals;
    // need to establish body format for parsing.
    const { schemaName, rows } = req.body;

    // check if table has already been made
    pool.query(
      'CREATE TABLE IF NOT EXISTS Schemas (user_id INT, schema_name VARCHAR (50), schema_id INT, key VARCHAR(50), type VARCHAR(50), options_check BOOLEAN DEFAULT FALSE, unique_check BOOLEAN DEFAULT FALSE, required_check BOOLEAN DEFAULT FALSE)',
      (err, result) => {
        if (err) {
          console.error('error in adding table.');
          throw new Error(err);
        }
        const queryText =
          'INSERT INTO Schemas (user_id, schema_name, schema_id, key, type, options_check, unique_check, required_check) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        rows.forEach((row, idx) => {
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
            user_id,
            schemaName,
            schema_id,
            key,
            type,
            areThereOptions,
            isUnique,
            isRequired
          ];
          pool.query(queryText, queryValues, (rowErr, result) => {
            if (rowErr) {
              throw new Error(rowErr);
            }
          });
        });
        return next();
      }
    );
  },

  // gets one specific schema
  getSchema: (req, res, next) => {
    const { user_id, schema_id } = req.query;
    pool.query(
      'SELECT * FROM Schemas WHERE user_id=$1 AND schema_id=$2',
      [user_id, schema_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from getSchema' });
        }
        return res.status(200).json(result.rows);
      }
    );
  },
  getAllSchema: (req, res, next) => {
    const { user_id } = res.locals;
    pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'error from getAllSchema' });
      }
      res.locals.userSchema = result.rows;
      console.log('schemaController -> getAllSchema -> res.locals.userSchema', res.locals.userSchema);
      return next();
      // return res.status(200).json(result.rows);

    })
  },
  refreshAllSchema: (req, res, next) => {
    const { user_id } = res.locals;
    pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: 'error from getAllSchema' });
      }
      //  console.log('schemaContorller => getAllSechama', result.rows);
      // need to make data in a more workable format. currently a bigass array

      console.log('schemaController => refreshAllSchema => result', result)
      return res.locals.userSchema = result.rows;

      // return res.status(200).json(result.rows);

    })
  },
  updateSchema: (req, res, next) => {
    // expecting to receive user_id and post_id and other fields that we want to update from req.body
    const {
      user_id,
      schema_id,
      schemaName,
      key,
      type,
      options_check,
      unique_check,
      required_check
    } = req.body;

    // query for the table
    pool.query(
      'UPDATE Schemas SET schemaName=$1 key=$2 type=$3 options_check=$4 unique_check=$5 required_check=$6 WHERE user_id=$7 AND schema_id=$8',
      [
        schemaName,
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
        return res.status(200).json(result.rows);
      }
    );
  }
};

module.exports = schemaController;
