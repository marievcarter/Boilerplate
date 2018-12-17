// modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// create express app
const app = express();

// add middleware to provide server logs
app.use(morgan('dev'));

// middleware to serve static assets from server
app.use(express.static(path.join(__dirname, '../public')));

// middleware to parse request bodies (req.body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// matches all server requests to /api
app.use('/api', require('./apiRoutes'));

// for all requests, regardless of whether they match or // not, send basic html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// handle 500 internal server errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// start server, listen on port 3000
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku! ??
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
