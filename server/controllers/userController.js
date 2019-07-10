///////////////////////////////////////////////////////////////
// Backend: user_id should not be assigned to an object called data. Assign it directly to res.locals. Make sure everything that accesses user_id is adjusted. => => => DONE
///////////////////////////////////////////////////////////////

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./database');

//const createToken = user => jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => { console.log('made token: ', token); return token; });

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

    pool.query(`INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`)
      .then((data) => {
        console.log('some data: ', data);
        // THIS NEEDS TO CHANGE, IT'S ALL THE DATA
        ////// res.locals.data = { username: data.rows[0].username, user_id: data.rows[0].user_id };
        res.locals.user_id = data.rows[0].user_id;
        res.locals.username = data.rows[0].username;

        return next();
      })
      .catch((err) => {
        return res.status(500).send('Error creating user. Please try again.');
      })
  },

  //  WHERE username = '${username}'
  login: (req, res, next) => {
    
    const { email: username, password } = req.body;
    // console.log(username);
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        //check the length of the row instead of undefined
        
        if (data.rows[0].username === undefined) {
          console.log('this is data rows',data.rows[0])
          return res.status(401).send('Unable to login.');
        }
        else return data.rows[0];
      })
      .then((userFound) => {
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (err) {
            console.log('inside of 500')
            return res.status(500).send('Internal error authorizing credentials.');
          }
          if (result) {
            res.locals.user_id = userFound.user_id;
            return next();
          }
          console.log('inside of 401')
          return res.status(401).send('Unable to login.');
        });
      })
      .catch(err => res.status(500).send('There is an error'));

  },
  setJwt: (req, res) => {
    console.log('inside of set jwt');
    jwt.sign({ user_id: res.locals.user_id }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {

      // sends back username, and user_id
      console.log('set jwt')
      return res.cookie('ssid', token).status(200).json({
        user_id: res.locals.user_id, userSchema: res.locals.userSchema,
      });
      // need to create res.locals of user schema 

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
    })
  }
};


module.exports = userController;
