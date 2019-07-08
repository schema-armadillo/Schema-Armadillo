const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./database');

const createToken = user => jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => { console.log('made token: ', token); return token; });

const userController = {
  createUser: (req, res, next) => {
    const { email: username, password } = req.body;
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
      res.locals.data = { username: data.rows[0].username, user_id: data.rows[0].user_id };
      return next();
    })
    .catch((err) => {
      console.log('error adding user to DB: ', err);
      return res.status(500).send('Error creating user. PLease try again.');
    }),

  //  WHERE username = '${username}'
  login: (req, res, next) => {
    const { email: username, password } = req.body;
    // console.log(username);
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        console.log('data rows:\n\n', data.rows[0]);
        if (data.rows[0] === undefined) { res.status(401).send('Unable to login.'); }
        else return data.rows[0];
      })
      .then((userFound) => {
        console.log('user has been found: ', userFound);
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (err) {
            console.log('sending error from inside bcrypt');
            return res.status(500).send('Internal error authorizing credentials.');
          }
          if (result) {
            console.log('result is true');
            res.locals.data = { username: userFound.username, user_id: userFound.user_id }
            return next();
            // res.cookie('new', createToken(result));
            // return res.status(200).send('success');
          }

          console.log('there is an error, after brcyprt process');
          return res.status(401).send('Unable to login.');
        });
      })
      .catch(err => res.status(500).send(err));
  },
  setJwt: (req, res) => {
    console.log('inside of set jwt');
    jwt.sign({ user_id: res.locals.data.user_id }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
      // sends back username, and user_id
      return res.cookie('ssid', token).status(200).json(res.locals.data);
    });
  },
  checkJwt: (req, res) => {
    console.log('checking jwt')
    const { ssid } = req.cookies;
    console.log(ssid);
    jwt.verify(ssid, 'secretkey', (err, isverified) => {
      if (err) return res.status(401).json({isLoggedIn: false})
      else return res.status(200).json({isLoggedIn: true})
    })
  }
};


module.exports = userController;
