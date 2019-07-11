// require('pg') = Non-blocking PostgreSQL client for Node.js. Pure JavaScript and optional native libpq bindings.
const { Pool } = require('pg');

// new Pool([config: object])
// Every field of the config object is entirely optional. The config passed to the pool is also passed to every client instance within the pool when the pool creates that client.
const pool = new Pool({
  user: 'armadillo',
  host: 'localhost',
  database: 'schema-armadillo',
  password: 'pink',
  port: 5432,
});


// Queries the ProstgreSQL, SQL Query: If table "users" does not exist, create one.
    // rules in respective order:
        // user_id will be incremented with a SERIAL PRIMARY KEY
        // max username upto 50 characters, must also be unique
        // max password upto 100 because a hashed password may expand the smaller password
pool.query(
  `CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, username VARCHAR(50) , password VARCHAR(100), team_id INT, type VARCHAR(100) DEFAULT 'Armadillo')`,
  (err, result) => {
    if (err) return console.error(err);
  },
);

module.exports = pool;
