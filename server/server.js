const express = require('express');
const path = require('path');

// Node.js body parsing middleware.
  // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
const cookieParser = require('cookie-parser');

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cors = require('cors'); 
const schema = require('./routers/schema'); 
const user = require('./routers/user');
const githubRouter = require('./routers/githubRouter')

const app = express();
const port = 3000;

app.use(cors());
app.use(cookieParser());

// app.use(bodyParser.json()) basically tells the system that you want json to be used.
app.use(bodyParser.json());

// bodyParser.urlencoded({extended: ...}) 
  // basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) 
  // or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('img'));

app.use('/auth', user);
app.use('/api', schema);
app.use('/github', githubRouter);


// using this as last possible route *NOTICE* how this is last path in the file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
