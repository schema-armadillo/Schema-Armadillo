require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const user = require('./routers/user');
const schema = require('./routers/schema');
const google = require('./routers/google');

const googleController = require('./controllers/googleController');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

// create routers for separate endpoints

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the root route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
  // res.send('hello')
});
app.use('/google', googleController.getCode, googleController.getToken);

app.post('/test', (req, res) => {
  console.log('posted to /test');
  console.log(req.body);
  // return res.status(200).redirect('/dashboard');
  return res
    .set('Content-Type', 'application/json')
    .status(200)
    .json({ success: true, redirecturl: '/dashboard' });
});

// commenting these two routes since sophie and indra may not have database set up yet and it will give them an error
// app.use('/user', user);
// changed from user
app.use('/auth', user);
app.use('/api', schema);


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});