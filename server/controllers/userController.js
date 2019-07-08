const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./database');

const createToken = user => jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => { console.log('made token: ', token); return token; });

const userController = {
  createUser: (req, res, next) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashResponse) => {
      if (err) {
        return res.status(500).send('error encrypting pw');
      }
      res.locals.username = username;
      res.locals.password = hashResponse;
      return next();
    });
  },
  addUserToDB: (req, res, next) => pool.query(
    `INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`,
  )
    .then((data) => {
      console.log('some data: ', data);
      // THIS NEEDS TO CHANGE, IT'S ALL THE DATA
      res.locals.data = data.rows[0];
      res.locals.username = data.rows[0].username;
      res.locals.createUser = true;
      return next();
    })
    .catch((err) => {
      console.log('error adding user to DB: ', err);
      return res.status(500).send('Error creating user. PLease try again.');
    }),

  //  WHERE username = '${username}'
  login: (req, res, next) => {
    const { email: username, password } = req.body;
    console.log(username);
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        console.log('data rows:\n\n', data.rows[0]);
        return data.rows[0];
      })
      .then((userFound) => {
        console.log('user has been found: ', userFound);
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (err) {
            console.log('sending error from inside bcrypt');
            return res.send(err);
          }
          if (result) {
            console.log('result is true');
            res.locals.createUser = false;
            res.locals.username = userFound.username;
            return next();
            // res.cookie('new', createToken(result));
            // return res.status(200).send('success');
          }

          console.log('there is an error, after brcyprt process');
          return res.status(500).send('Error');
        });
      })
      .catch(err => res.status(500).send(err));
  },
  setJwt: (req, res) => {
    console.log('inside of set jwt');
    jwt.sign({ user: res.locals.username }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
      if (res.locals.createUser) {
        // set jwt for create user. needs diff response.
        return res.status(200).json(res.locals.data);
      }
      // handle if someone is logging in
      console.log('made token: ', token);
      res.cookie('ssid', token);
      return res.status(200).send('success');
    });
  },

};


module.exports = userController;
