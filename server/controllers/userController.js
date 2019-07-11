const dotenv = require('dotenv');
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

  addUserToDB: (req, res, next) => pool.query(
    `INSERT INTO users (username, password, oauth) 
    VALUES ('${res.locals.username}', '${res.locals.password}', '${res.locals.oauth}') 
    RETURNING user_id, username`,
  )
    .then((data) => {
      // THIS NEEDS TO CHANGE, IT'S ALL THE DATA
      res.locals.data = {
        username: data.rows[0].username,
        user_id: data.rows[0].user_id,
        oauth: data.rows[0].oauth,
      };
      res.locals.user_id = data.rows[0].user_id;
      return next();
    })
    .catch((err) => {
      console.error('error adding user to DB: ', err);
      return res.status(500).send('Error creating user. Please try again.');
    }),

  login: (req, res, next) => {
    const { email: username, password } = req.body;
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        if (data.rows[0] === undefined) { return res.status(401).send('Unable to login.'); }
        return data.rows[0];
      })
      .then((userFound) => {
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (err) {
            return res.status(500).send('Internal error authorizing credentials.');
          }
          if (result) {
            res.locals.user_id = userFound.user_id;
            return next();
          }
          return res.status(401).send('Unable to login.');
        });
      })
      .catch(err => res.status(500).send(err));
  },


  setJwt: (req, res, next) => {
    jwt.sign(
      { user_id: res.locals.user_id },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 60 },
      (err, token) => {
        res.locals.jwtToken = token;
        next();
      },
    );
  },

  sendUserIdAndSchema: (req, res) => { //only for logging in the first time (without cookies)
    return res.cookie('ssid', res.locals.jwtToken).status(200).json({ user_id: res.locals.user_id, userSchema: res.locals.userSchema });
  },

  // TODO: Only check jwt when saving schema
  checkJwt: (req, res, next) => {
    const { ssid } = req.cookies;
    jwt.verify(ssid, process.env.SECRET_KEY, (err, result) => {
      if (err) { return res.status(401).json({ isLoggedIn: false }); }
      res.locals.user_id = result.user_id;
      return next();
    });
  },

  redirectToRoot: (req, res) => {

    if (process.env.NODE_ENV !== "production") { //=== "development"
      return res.cookie('ssid', res.locals.jwtToken).redirect('http://localhost:8080');
    }
    else return res.cookie('ssid', res.locals.jwtToken).redirect('/');
  },

  logout: (req, res) => {
    res.clearCookie("ssid")
    if (req.cookies.googlejwt) res.clearCookie("googlejwt");
    res.status(200).send();
  },

};

module.exports = userController;
