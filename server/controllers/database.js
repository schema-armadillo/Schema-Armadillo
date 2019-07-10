const { Pool } = require('pg');

const pool = new Pool({
  user: 'armadillo',
  host: 'localhost',
  database: 'schema-armadillo',
  password: 'pink',
  port: 5432,
});

pool.query(
  'CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE, password VARCHAR(100), team_id INT)',
  (err, result) => {
    if (err) return console.error(err);
  },
);

module.exports = pool;
