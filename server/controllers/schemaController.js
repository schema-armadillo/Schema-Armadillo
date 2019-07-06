const pool = require('./database');

const schemaController = {
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
      unique,
      required
    } = req.body;

    // query for the table
    pool.query(
      'UPDATE Schemas SET schema_name=$1 key=$2 type=$3 options_check=$4 unique=$5 required=$6 WHERE user_id=$7 AND schema_id=$8',
      [
        schema_name,
        key,
        type,
        options_check,
        unique,
        required,
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
