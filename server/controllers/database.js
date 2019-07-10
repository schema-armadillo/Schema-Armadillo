const { Pool } = require('pg');

const pool = new Pool({
  user: 'ivyimrtn',
  host: 'raja.db.elephantsql.com',
  database: 'ivyimrtn',
  password: process.env.DB_PW,
  port: 5432,
});

// !!!!!! IMPORTANT: PW NEEDS TO BE LONGER
// !!! IMPORTANT, USERNAME NEEDS TO BE UNIQUE
pool.query(
  'CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE, password VARCHAR(100), oauth VARCHAR(10))', //oauth will be null, github, or google
  (err, result) => {
    if (err) return console.error(err);
    console.log('CREATE TABLE users', result);
  },
);

module.exports = pool;
