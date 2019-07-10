const jwt = require('jsonwebtoken');
const pool = require('./database');

const schemaController = {
  createSchemaId: (req, res, next) => {
    // create schema_ids table if not already existing
    pool.query('CREATE TABLE IF NOT EXISTS schema_IDs (schema_id SERIAL PRIMARY KEY, schema_name VARCHAR(50), user_id INT)')
      .then(() => {
        const { schemaName } = req.body;
        const { user_id } = res.locals;

        // insert new schema id into schema_ids table
        return pool.query('INSERT INTO schema_IDs (user_id, schema_name) VALUES ($1, $2) RETURNING schema_id', [user_id, schemaName]);
      })
      .then((insertResult) => {
        res.locals.schema_id = insertResult.rows[0].schema_id;
        return next();
      })
      .catch((err) => {
        console.error('error in creating schema_ids table');
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

    jwt.verify(ssid, 'secretkey', (err, result) => {
      if (err) {
        return res.status(401).json({ isLoggedIn: false })
      }
      const { user_id } = result;

      // query the table using user_id and schema_id
      pool.query('SELECT * FROM Schemas WHERE user_id=$1 AND schema_id=$2', [user_id, schema_id])
        .then(schemaInfo => res.status(200).json(schemaInfo.rows))
        .catch(err => res.status(400).send(err));
    });
  },
  getAllSchema: (req, res, next) => {
    const { user_id } = res.locals;

    if (user_id) {
      pool.query(`CREATE TABLE IF NOT EXISTS Schema_IDs (schema_id SERIAL PRIMARY KEY, schema_name VARCHAR(50), user_id INT)`, (err, result) => {
        if (err) {
          console.error('error in creating schema_id table');
          throw new Error(err);
        }

        pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`, (err, result) => {
          if (err) {
            return res.status(400).json({ error: 'error from getAllSchema' });
          }
          res.locals.userSchema = result.rows;
          return next();

        });
      })
    }
    else {
      const { ssid } = req.cookies;

      jwt.verify(ssid, 'secretkey', (err, result) => {
        if (err) {
          return res.status(401).json({ isLoggedIn: false })
        }
        const { user_id } = result;

        pool.query(`SELECT * FROM schema_ids WHERE user_id='${user_id}'`, (err1, result1) => {
          if (err1) {
            return res.status(400).json({ error: 'error from getAllSchema' });
          }
          return res.send(result1.rows);
        });
      });
    }
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
