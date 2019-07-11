require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const schema = require('./routers/schema');
const user = require('./routers/user');
const google = require('./routers/google');
const github = require('./routers/github');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/auth', user);
app.use('/api', schema);
app.use('/google', google);
app.use('/github', github);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
