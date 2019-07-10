const express = require('express');
const path = require('path');;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const schema = require('./routers/schema');
const cors = require('cors');
const user = require('./routers/user');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(cookieParser());

app.use('/auth', user);
app.use('/api', schema);

// create routers for separate endpoints
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
  // res.send('hello')
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
