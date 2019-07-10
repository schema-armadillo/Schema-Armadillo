const axios = require('axios');
const queryString = require('query-string');

const githubController = {
  getCode: (req, res, next) => {
    res.locals.code = req.query.code;
    next();
  },
  postCode: (req, res, next) => {
    let uri = 'https://github.com/login/oauth/access_token';
    uri += '?client_id=a47e12225465438143f6';
    uri += '&client_secret=a7035357a23db9f14ed840d0fb58fafc376c09c7';
    uri += `&code=${res.locals.code}`;
    uri += '&redirect_uri=http://localhost:3000/github'
    // res.status(200).end();
    axios.post(uri)
      .then(response => {
        res.locals.accessToken = queryString.parse(response.data).access_token;
        next();
      })
      .catch(err => {
        console.log(err, 'this is an error');
        res.status(500).end('Internal error');
      });
  },
  getEmail: (req, res, next) => {
    const headers = { 'Authorization': `token ${res.locals.accessToken}` };
    console.log('these are our headers:', headers);
    axios.get('https://api.github.com/user/emails', { headers })
      .then((response) => {
        const emails = response.data;
        let primaryEmail;
        for (const obj in emails) {
          if (obj.primary) primaryEmail = obj.email;
        }
        res.locals.username = primaryEmail;
        res.locals.oauth = 'github';
      })
      .catch(err => console.log(err, 'error fetching emails'));
  }
};

module.exports = githubController;