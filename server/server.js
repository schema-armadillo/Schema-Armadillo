const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
 const user = require('./routers/user');
// const schema = require('./routers/schema');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// create routers for separate endpoints
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
  // res.send('hello')
});
//changed from user
app.use('/auth', user);
// app.use('/api', schema);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
