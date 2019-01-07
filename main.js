const app = require('./server/index');
// start server, listen on port 3000
// this can be very useful if you deploy to Heroku! ??
const PORT = process.env.PORT || 3000;
const db = require('./server/db/index.js');
const session = require('express-session');

// configure and create database store
const SequelizeStore = require('connect-session-sequelize');
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

// sync so session table gets created
dbStore.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// passport will use the req.session object,
// so must be declared before passport config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

db.sync().then(function() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
