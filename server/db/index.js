const Sequelize = require('sequelize');

// if using heroku for deployment, you'll have access to the // database url as an environment variables
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/boilerplate',
  {
    logging: false,
    // add additional logs here
  }
);

module.exports = db;
