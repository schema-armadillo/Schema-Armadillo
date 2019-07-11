const axios = require('axios');
const pool = require('./database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const githubController = {};



githubController.getAccessToken = (req, res, next) => {
    axios.post('https://github.com/login/oauth/access_token',{
        client_id: 'c00c813fbd8b7e971b26',
        client_secret: 'df8aefaae915a861e5e328127e8421dd37171333',
        code: req.query.code
    }, {
        headers: { Accept :'application/json'}
    })
    .then(response => {
        if(response.data["access_token"]){
            res.locals.access_token = response.data["access_token"]
            return next();
        }
        else{
            throw new Error("error in getting access token")
        }
    })
    .catch(() => res.status(500).send("External server error. Failed to get access token from github"))
}

githubController.accessAPI = (req, res, next) =>{
    axios.get('https://api.github.com/user',{
        headers: { Authorization: `token ${res.locals.access_token}`}
    })
    .then(response => {
        bcrypt.hash(response.data.id.toString(), 10, (err, hashResponse) => {
            if (err) {
              return res.status(500).send('error encrypting pw');
            }
            res.locals.username = response.data.login;
            res.locals.password = hashResponse; // store hasedResponse to sql database
            res.locals.gitId = response.data.id.toString(); //need this for bcrypt compare
            return next();
            // return res.send('done bcrypting')
        })
    })
    .catch(() => res.status(500).send('External server error. Failed to get user information from github'))
}

githubController.verifyUser = (req, res, next) => {
    pool.query(`SELECT * from users where username='${res.locals.username}' and type = 'github'`)
      .then((data) => {
          if(data.rows.length === 0){
              return next();
          }
          return next('route');
      })
}

githubController.addUserToDB = (req, res, next) => {

    pool.query(`INSERT INTO users (username, password, type) VALUES ('${res.locals.username}', '${res.locals.password}','github') RETURNING user_id, username`)
      .then((data) => {
        res.locals.user_id = data.rows[0].user_id;
        res.locals.username = data.rows[0].username;

        return next();
      })
      .catch(() => res.status(500).send('Error creating user. Please try again.'));
  },



githubController.login  = (req, res, next) => {
    pool.query(`SELECT * FROM users WHERE username = '${res.locals.username}' and type = 'github'`)
      .then((data) => {
        const userFound = data.rows[0];
        bcrypt.compare(res.locals.gitId, userFound.password)
          .then((valid)=>{
              if(valid){
                res.locals.user_id = userFound.user_id;
                return next();  
              }
              return res.status(401).send('Unable to login.');
          })
          .catch(err => res.status(500).send('Internal error authorizing credentials.'));
      })
      .catch(err => res.status(500).send('Error when trying to bcrypt compare passwords'));
}

githubController.setJwt = (req, res, next) => {
    jwt.sign({ user_id: res.locals.user_id }, 'secretkey', { expiresIn: 60 * 60 }, (err, token) => {
        // sends back username, and user_id
        res.cookie('ssid', token)
        // .status(200).json({
        //   user_id: res.locals.user_id, userSchema: res.locals.userSchema,
        // });
        return next();
      });  
}

module.exports = githubController;