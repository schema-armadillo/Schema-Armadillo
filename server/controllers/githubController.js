const axios = require('axios');


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
    .catch(() => res.status(500).send("External Server error"))
}

githubController.accessAPI = (req, res) =>{
    axios.get('https://api.github.com/user',{
        headers: { Authorization: `token ${res.locals.access_token}`}
    })
    // .then(response => response.json())
    .then(response => {
        console.log('hello', response)
        return res.json('response')
    })
    .catch(error => console.log('hello', error))
}


module.exports = githubController;