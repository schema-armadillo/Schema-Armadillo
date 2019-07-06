const pool = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userController = {
  createUser: (req, res, next) => {
    const { username, password } = req.body
    console.log(req.body)
    bcrypt.hash(password, 10, (err, hashResponse) => {
      console.log('inside hash: ', hashResponse);
      if (err) {
        console.log('error thrown inside hash');
        return res.status(500).send('error encrypting pw');
      } else {
        res.locals.username = username
        res.locals.password = hashResponse
        return next();
      }
    })
  },
  addUserToDB: (req, res) => {
    console.log('inside add user to DB');
    return pool.query(
      `INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`)
      .then((data) => {
        console.log(data)
        return res.status(200).json(data.rows[0])
        // data.rows[0]
      })
      .catch( err => {
        console.log('error adding user to DB')
        return res.status(500).send('Error creating user. PLease try again.');
      })
  },


  // addUserToDB: (req, res) => {
  //   console.log('inside add user to DB');
  //   pool.query(
  //     `INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`, (err, data) => {
  //       if (err) {
  //         console.log('error adding user to DB')
  //         throw new Error(err);
  //       // return res.status(500).send('Error creating user. PLease try again.');
  //       }
  //       console.log(data)
  //       return res.status(200).json(data.rows[0])
  //     });
  

  login: (req, res, next) => {
    const userReq = req.body
    let user;

    getUser(userReq)
      .then((userFound) => {
        user = userFound;
        return passwordCheck(userReq.password, user)
      })
      .then((res) => createToken(user))
      .then((token) => {
        res.cookie('token', token)
      })
    res.status(200).send()
      .catch((err) => console.log(err))
  }
};

const getUser = (userReq) => {
  return pool.query(`SELECT * FROM users WHERE username = ${userReq}`)
    .then((data) => data.rows[0])
}

const addUserToDB = (req, res, next) => {
  return pool.query(
    `INSERT INTO users (username, password) VALUES (${res.locals.username}, ${res.locals.password}) RETURNING user_id, username`)
    .then((data) => {
      console.log(data)
      return res.status(200).json(data.rows[0])
    })
}

const passwordCheck = (passwordReq, foundUser) => {
  bcrypt.compare(passwordReq, foundUser, (err, result) => {
    if (err) {
      return res.status(401).json({
        failed: 'Unauthorized Access'
      })
    }
    if (result) {
      return res.status(200).json({
        success: 'Access Granted'
      })
    }
    return res.status(401).json({
      failed: 'Unauthorized Access'
    })
  })
}

const createToken = (user) => {
  jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
    res.json({ token })
  })
}




module.exports = userController;
