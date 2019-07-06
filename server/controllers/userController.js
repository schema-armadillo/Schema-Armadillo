const userController = {
  createUser: (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password, 10, (err, hashResponse) => {
      if (err) {
        return res.status(500).json({
          error: err
        })
      } else {
        createUser(user, hashResponse)
        // send an object to the front end
      }
    }).catch(error => {
      res.status(500).json({
        error: error
      })
    })
  },

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

const createUser = (user, hashResponse) => {
  return pool.query(
    `INSERT INTO users (username, password) VALUES (${user.username}, ${hashResponse}) RETURNING user_id, username`)
    .then((data) => data.rows[0])
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
