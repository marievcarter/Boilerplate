const app = require('./server/index');
// start server, listen on port 3000
// this can be very useful if you deploy to Heroku! ??
const PORT = process.env.PORT || 3000;
const db = require('./server/db/index.js');

db.sync().then(function() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
