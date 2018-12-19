/* modules */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
// create express app
const app = express();
const db = require('./db/index');
// session middleware
const session = require('express-session');
// configure and create database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });
// bring in passport for auth
const passport = require('passport');

//sync dbstore so session table gets created
dbStore.sync();

/* middleware */

// add middleware to provide server logs
app.use(morgan('dev'));

// middleware to parse request bodies (req.body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to serve static assets from server
app.use(express.static(path.join(__dirname, '../public')));

// use session middleware
app.use(
  session({
    // we might store our session secret as an
    // environment variable
    secret: process.env.SESSION_SECRET || 'sample insecure secret',
    // add db store to session
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport to use req.session and
// attach user to request object
// this must be AFTER the session middleware
app.use(passport.initialize());
app.use(passport.session());

// matches all server requests to /api
app.use('/api', require('./apiRoutes'));

/* error handling routes */

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

// handle serialization/deserialization of user
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  // obviously, this can only be used if you have // a user model defined
  // User.findById(id)
  //   .then(user => done(null, user))
  //   .catch(done);
});

module.exports = app;
