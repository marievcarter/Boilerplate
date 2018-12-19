const Sequelize = require('sequelize');
const db = require('./index.js');

// define model
const Sample = db.define('sample', {
  field1: {
    type: Sequelize.STRING,
  },
  field2: {
    type: Sequelize.INTEGER,
  },
});

// define associations
Sample.hasMany(Sample);

module.exports = { Sample, db };
