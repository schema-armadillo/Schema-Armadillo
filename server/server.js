const express = require('express');
const path = require('path');;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const schema = require('./routers/schema');
const user = require('./routers/user');
const githubRouter = require('./routers/githubRouter')

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


app.use(express.static('img'));

app.use('/auth', user);
app.use('/api', schema);
app.use('/github', githubRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
