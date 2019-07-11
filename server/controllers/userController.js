// JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
  // src: https://tools.ietf.org/html/rfc7519
const jwt = require('jsonwebtoken');

// A library to help you hash passwords.
const bcrypt = require('bcrypt');

// SQL Data base required here
const pool = require('./database');

const userController = {
    

  createUser: (req, res, next) => {
    
    // email was deconstructed and renamed as username
    const { email: username, password } = req.body;

    // hashing password and storing it in locals
    bcrypt.hash(password, 10, (err, hashResponse) => {
      if (err) {
        return res.status(500).send('error encrypting pw');
      }
      res.locals.username = username;
      res.locals.password = hashResponse;
      
      // next() will start the next function that was ordered in 'user.js' file;
      return next();
    });
  },


  addUserToDB: (req, res, next) => {

    // adding a user and their hashed password into the database
    pool.query(`INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`)
      .then((data) => {
        res.locals.user_id = data.rows[0].user_id;
        return next();
      })
      .catch(() => res.status(500).send('Error creating user. Please try again.'));
  },


  login: (req, res, next) => {
    
    // email was deconstructed and renamed as username
    const { email: username, password } = req.body;

    // This query will try to find the username trying to login
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {

        // checking if user was found by checking the row length
        if (data.rows.length === 0) {
          return res.status(401).send('Unable to login.');
        }

        // storing an object about the found user:
          // [ { 
          //     user_id: Number,
          //     username: String,
          //     password:  hashed password in String
          //     team_id: null 
          //   } ],
        const userFound = data.rows[0];
        
        // bcrypt.compare(myPlaintextPassword, hash) => returns boolean true/false
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
 // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    jwt.sign({ user_id: res.locals.user_id }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
      
      // sends back username, and user_id
      // res.cookie(name, value [, options]) => Sets cookie name to value. The value parameter may be a string or object converted to JSON.
      return res.cookie('ssid', token)
        .status(200)
        .json({
          user_id: res.locals.user_id, 
          userSchema: res.locals.userSchema,
        });
    });
  },


  checkJwt: (req, res, next) => {

    // we are deconstructing 'ssid' because that is the key name we gave it when we signed the the JWT
    const { ssid } = req.cookies;
 
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    jwt.verify(ssid, 'secretkey', (err, result) => {
      if (err) {
        return res.status(401).json({ isLoggedIn: false })
      }

      // result is an object that holds:
        // {
        //   user_id: Number,
        //   iat: Number,
        //   exp: Number
        // }
      // creating a user_id key in locals and stored the value of result.user_id
      res.locals.user_id = result.user_id;
      next();
    });
  },
};


module.exports = userController;
