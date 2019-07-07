const pool = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userController = {
  createUser: (req, res, next) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10, (err, hashResponse) => {
      if (err) {
        return res.status(500).send('error encrypting pw');
      } else {
        res.locals.username = username
        res.locals.password = hashResponse
        return next();
      }
    })
  },
  addUserToDB: (req, res) => {
    return pool.query(
      `INSERT INTO users (username, password) VALUES ('${res.locals.username}', '${res.locals.password}') RETURNING user_id, username`)
      .then((data) => {
        console.log(data)
        return res.status(200).json(data)
      })
      .catch(err => {
        console.log('error adding user to DB')
        return res.status(500).send('Error creating user. PLease try again.');
      })
  },

  login: (req, res) => {
    const { username, password } = req.body
    // let user;

    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        console.log('data rows', data.rows[0])
        return data.rows[0]
      })
      .then((userFound) => {
        console.log('user has been found')
        bcrypt.compare(password, userFound.password, (err, result) => {
          if (err) {
            return res.send(err)
          }
          if (result) {
            res.cookie('new', 'dasdasdasdasdasdad')
            console.log('cookie sets')
            return res.status(200).send('success')
          }
          else{
            console.log('there is an error')
            return res.status(500).send('Error')
          }
        }) 
      })
      // .then((user) => {
      // res.cookie('token', createToken(user))
      // res.cookie('new', 'dasdasdasdasdasdad')
      //   return res.send('success')
      // })
      .catch((err) => res.status(500).send(err))
  }
};




//helper functtions

// const getUser = (username) => {
//   console.log(username);
//    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
//     .then((data) =>{
//       console.log('data rows',data.rows[0])
//       return data.rows
//     })
// }

// const passwordCheck = (passwordReq, foundUser) => {
//   bcrypt.compare(passwordReq, foundUser, (err, result) => {
//     console.log(result)
//     if (err) {
//       return false
//     }
//     return result
//   })
// }

const createToken = (user) => {
  jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
    return token
  })
}




module.exports = userController;

