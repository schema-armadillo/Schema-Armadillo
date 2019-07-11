

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./database');

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

  addUserToDB: (req, res, next) => {
    pool.query(`SELECT * from users where username='${res.locals.username}' and type = 'Armadillo'`)
      .then((data) => {
          if(data.rows.length === 0){
            pool.query(`INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`)
            .then((data) => {
              res.locals.user_id = data.rows[0].user_id;
              res.locals.username = data.rows[0].username;
      
              return next();
            })
          }
          throw new Error('username taken in armadillo type')
        })
      .catch(() => res.status(500).send('Error creating user. Please try again.'));
  },

  login: (req, res, next) => {

    const { email: username, password } = req.body;
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        if (data.rows.length === 0) {
          return res.status(401).send('Unable to login.');
        }
        const userFound = data.rows[0];
        bcrypt.compare(password, userFound.password)
          .then((valid) => {
            if (valid) {
              res.locals.user_id = userFound.user_id;
              return next();
            }
            return res.status(401).send('Unable to login.');
          })
          .catch(err => res.status(500).send('Internal error authorizing credentials.'));
      })
      .catch(err => res.status(500).send('Error when trying to bcrypt compare passwords'));

  },
  setJwt: (req, res) => {
    jwt.sign({ user_id: res.locals.user_id }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
      // sends back username, and user_id
      return res.cookie('ssid', token).status(200).json({
        user_id: res.locals.user_id, userSchema: res.locals.userSchema,
      });
    });
  },
  //
  checkJwt: (req, res, next) => {
    const { ssid } = req.cookies;
    jwt.verify(ssid, 'secretkey', (err, result) => {
      if (err) {
        return res.status(401).json({ isLoggedIn: false })
      }
      res.locals.user_id = result.user_id;
      next();
    });
  },
};


module.exports = userController;
