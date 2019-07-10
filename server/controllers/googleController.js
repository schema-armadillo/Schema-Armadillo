const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleController = {
    //for initial option to use google oauth (happens when user clicks on signup with google button on login page)
    getCode: (req, res) => {
        // console.log("IN THE GET CODE")
        axios.get(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&response_type=code&scope=openid%20email&redirect_uri=http://localhost:3000/google/googleOAuth`)
            .then((response) => {
                res.send(response.data); //response.data is the html for the google signin page
            })
            .catch((error) => {
                console.log('Error in getting the code:');
            });
    },

    //for actually getting token from google
    //!IMPORTANT - redirect uri is the same as that whence it came
    getToken: (req, res, next) => {
        // console.log("here I am, in getToken")
        const code = req.query.code;
        res.locals.code = code;
        axios.post(`https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=http://localhost:3000/google/googleOAuth&grant_type=authorization_code&Content-Type=application/x-www-form-urlencoded`)
            .then(response => {
                // console.log("IN THE GETTOKEN POST REQUEST")
                let googlejwt = response.data.id_token;
                googlejwt = googlejwt.split('.')[1]; //takes the second part of the jwt (because 098.0980.98090)
                const base64 = Buffer.from(googlejwt, 'base64').toString(); //takes the part out of base64
                const email = JSON.parse(base64).email; //grabs email
                res.locals.email = email;
                // res.cookie('email', email);
                res.cookie('googlejwt', googlejwt, { expires: new Date(Date.now() + 900000) }); //sets googlejwt cookie
                return next();
            })
            .catch((err) => {
                console.log('The error in getting the Token', err)
            })
    },

    getEmail: (req, res, next) => {
        // console.log("in getEmail")
        const { email } = res.locals;
        res.locals.username = email;
        res.locals.password = '';
        res.locals.oauth = 'google';
        // console.log("locals: ", res.locals)
        return next(); //goes to userController.setJWT then to userController redirect
    }
}

module.exports = googleController;