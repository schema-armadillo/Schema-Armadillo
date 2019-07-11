const jwt = require('jsonwebtoken');
const pool = require('./database');

const schemaController = {

  createSchemaId: (req, res, next) => {
    const { schemaName } = req.body;
    const { user_id } = res.locals;

    // create schema_ids table if not already existing
    pool.query('CREATE TABLE IF NOT EXISTS schema_IDs (schema_id SERIAL PRIMARY KEY, schema_name VARCHAR(50), user_id INT)')
      .then(() => {
        // search for duplicate
        return pool.query('SELECT schema_id FROM schema_IDS WHERE user_id=$1 AND schema_name=$2', [user_id, schemaName]);
      })
      .then(({ rows: dupes }) => {
        // if the search result is empty, then there is no duplicate
        if (!dupes.length) {
          // insert new schema id into schema_ids table
          pool.query('INSERT INTO schema_IDs (user_id, schema_name) VALUES ($1, $2) RETURNING schema_id', [user_id, schemaName])
            .then((insertResult) => {
              res.locals.schema_id = insertResult.rows[0].schema_id;
              return next();
            });

        // UPDATE the schema instead
        } else {

          // remove all the current schemas before adding any new ones
          const schemaDelete = pool.query('DELETE FROM schemas WHERE user_id=$1 AND schema_name=$2', [user_id, schemaName]);
          const schemaIdDelete = pool.query('DELETE FROM schema_ids WHERE user_id=$1 AND schema_name=$2', [user_id, schemaName]);

          // The Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.
          return Promise.all([schemaDelete, schemaIdDelete])
            .then(() => {

              // insert new schema
              pool.query('INSERT INTO schema_IDs (user_id, schema_name) VALUES ($1, $2) RETURNING schema_id', [user_id, schemaName])
                .then((insertResult) => {

                  // insertResult.rows contains array of objects = [ { schema_id: Number } ]
                  res.locals.schema_id = insertResult.rows[0].schema_id;
                  return next();
                });
            });
        }
      })
      .catch((err) => {
        console.error('error in creating new schema id');
        throw new Error(err);
      });
  },

  createSchema: (req, res, next) => {
    const { schema_id, user_id } = res.locals;
    // need to establish body format for parsing.
    const { schemaName, rows } = req.body;

    // check if table has already been made
    pool.query(
      'CREATE TABLE IF NOT EXISTS schemas (user_id INT, schema_name VARCHAR (50), schema_id INT, key VARCHAR(50), type VARCHAR(50), unique_check BOOLEAN DEFAULT FALSE, required_check BOOLEAN DEFAULT FALSE)')
      .then(() => {

        const queryText = 'INSERT INTO Schemas (user_id, schema_name, schema_id, key, type, unique_check, required_check) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
        rows.forEach((row) => {
          // iterate thru keys to create rows in the table
          const { key, type, options: { unique, required } } = row;
          // init queryValues array to pass into query
          const queryValues = [
            user_id,
            schemaName,
            schema_id,
            key,
            type,
            unique,
            required,
          ];
          pool.query(queryText, queryValues)
            .catch((err) => {
              console.log('error in adding row');
              throw new Error(err);
            });
        });
        return next();
      })
      .catch((err) => {
        console.error('error in creating a new schema.');
        throw new Error(err);
      });
  },

  // gets one specific schema
  getSchema: (req, res) => {
    const { ssid } = req.cookies;
    const { schema_id } = req.params;


    try {
      // decontructs the result of jwt.verify and uses that user_id to get a specific schema
      const { user_id } = jwt.verify(ssid, 'secretkey');
      pool.query('SELECT * FROM Schemas WHERE user_id=$1 AND schema_id=$2', [user_id, schema_id])
        .then(schemaInfo => res.status(200).json(schemaInfo.rows))
        .catch((err) => { throw new Error(err); });
    } catch (err) {
      res.status(500).send('jwt has been tampered with');
    }
  },


  getAllSchema: (req, res, next) => {
    // deconstructing user_id in order to use it to query the DB
    const { user_id } = res.locals;

    // if user_id is in res locals
    if (user_id) {

      // Queries the ProstgreSQL, SQL Query: If table "schema_IDs" does not exist, create one.
      pool.query('CREATE TABLE IF NOT EXISTS schema_IDs (schema_id SERIAL PRIMARY KEY, schema_name VARCHAR(50), user_id INT)')
        .then(() => pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`))
        .then((result) => {

          // result.rows is an array of objects, each object has:
            // {
            // schema_id: Number,
            // schema_name: String,
            // user_id: Number
            // }
          res.locals.userSchema = result.rows;
          return next();
        })
        .catch((err) => {
          console.log('error from getAllSchema table');
          throw new Error(err);
        });

    // otherwise user_id is inside our jwt
    } else {
      const { ssid } = req.cookies;

      // if anything breaks in the try body, it will catch an error
      try {
        // deconstructing from assuming if verification passes => if not, catch the error.
        const { user_id } = jwt.verify(ssid, 'secretkey'); // check userController.checkJwt for more info on jwt.verify
        pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`)
          .then(({ rows }) => res.status(200).send(rows))
          .catch(err => res.status(400).send('user doesnt exist'));
      } catch (err) {
        // jwt is malformed
        return res.status(500).send('jwt is malformed');
      }
    }
  },


  updateSchema: (req, res, next) => {
    // expecting to receive user_id and schema_id and other fields that we want to update from req.body
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

    // query update for the table
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
    // expecting to receive user_id and schema_id to find the rows that we want to delete
    const { user_id, schema_id } = req.body;
    // query delete for the table
    pool.query(
      'DELETE FROM schemas WHERE user_id=$1 AND schema_id=$2',
      [user_id, schema_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from delete Schema' });
        }
        // return res.status(200).json(result.rows);
      }
    );
    pool.query(
      'DELETE FROM schema_ids WHERE user_id=$1 AND schema_id=$2',
      [user_id, schema_id],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: 'error from delete Schema_ids' });
        }
        return res.status(200).json(result.rows);
      }
    );
  }
};

module.exports = schemaController;
