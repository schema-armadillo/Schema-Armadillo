const axios = require('axios');
const jwt = require('jsonwebtoken');

const googleController = {
    //for initial option to use google oauth
    getCode: (req, res) => {
        console.log("IN THE GET CODE")
        axios.get(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&response_type=code&scope=openid%20email&redirect_uri=http://localhost:3000/dashboard`)
            .then((response) => {
                // console.log("google response", response.data)
                res.send(response.data);
            })
            .catch((error) => {
                console.log('Error in getting the code:');
            });
        // res.status(200).send("IN THE GETCODE THING")
    },

    //for actually getting token from google
    getToken: (req, res, next) => {
        console.log("here I am, in getToken")
        const code = req.query.code;
        res.locals.code = code;
        // const sessionState = req.query.session_state;
        axios.post(`https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=http://localhost:3000/dashboard&grant_type=authorization_code&Content-Type=application/x-www-form-urlencoded`)
            .then(response => {
                let jwt = response.data.id_token;
                jwt = jwt.split('.')[1];
                const base64 = Buffer.from(jwt, 'base64').toString();
                const email = JSON.parse(base64).email;
                res.locals.email = email;
                res.cookie('email', email);
                res.cookie('jwt', jwt, { expires: new Date(Date.now() + 900000) });
                // return next();
                res.status(200).send("DONE GETTING TOKEN?")
            })
            .catch((err) => {
                console.log('The error in getting the Token', err)
            })
    },
    getEmail: (req, res) => {
        console.log("in getEmail")
        const { email } = res.locals;
        res.status(200).send("got email", email)
    }
}

module.exports = googleController;

/*
const axios = require('axios');

const authController = {}
const clientID = '367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com';
const clientSecret = 'Zerdhm_ou81oh_aUDYAoaNBV';

authController.getCode = (req, res, next) => {
    console.log(' in the auth controller ')
    axios.get('https://accounts.google.com/o/oauth2/v2/auth?client_id=367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com&response_type=code&scope=openid%20email&redirect_uri=http://localhost:3000/homepage')
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
        console.log('Error in getting the code:', error);
    });
}

authController.getToken = (req, res, next) => {
    const code = req.query.code;
   // const sessionState = req.query.session_state;
    axios.post(`https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=367617815829-730pkn7dkfaupsji6eon9b33vhpc8gru.apps.googleusercontent.com&client_secret=Zerdhm_ou81oh_aUDYAoaNBV&redirect_uri=http://localhost:3000/homepage&grant_type=authorization_code&Content-Type=application/x-www-form-urlencoded`)
    .then(response => {
        let jwt = response.data.id_token;
        jwt = jwt.split('.')[1];
        const base64 = Buffer.from(jwt, 'base64').toString();
        const email = JSON.parse(base64).email;
        res.locals.email = email;
        res.cookie('email', email);
        res.cookie('jwt', jwt, { expires: new Date(Date.now() + 900000) });
        return next();
    })
    .catch((err) => {console.log('The error in getting the Token', err)})
}

module.exports = authController;

*/