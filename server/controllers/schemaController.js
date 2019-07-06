const pool = require('./database');

const schemaController = {
  createSchema: (req, res, next) => {
    // extract all the form inputs
    const { schemaname } = req.body;

    // create the table
    pool.query(
      // have to add more options
      `CREATE TABLE IF NOT EXISTS ${schemaname}(key VARCHAR(50), type VARCHAR(50), options boolean, required boolean, default_value VARCHAR(50), user_id INT)`,
      (err, result) => {
        if (err) return console.error(err);
        console.log('CREATE TABLE schema', result);

        // populate the table
        // iterate thru keys to create rows in the table
        pool.query(
          `INSERT INTO ${schemaname} (key, type, options, required, default_value, user_id) values ($1, $2, $3, $4, $5, $6)`
        );
      }
    );
  },
  getSchema: (req, res, next) => {
    // expecting to receive user_id and post_id from req.body
    const { user_id, schema_id } = req.body;

    // how are we going to name our schemas?
    const schema_name = `schema${user_id}_${schema_id}_${schema_name}`;

    // query for the table
    pool.query(`select * from "${schema_name}"`, (err, result) => {
      console.log('schemaController => getSchema', result.rows);
      res.json(result.rows);
    });
  }
};

module.exports = schemaController;
