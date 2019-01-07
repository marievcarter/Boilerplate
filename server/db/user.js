const Sequelize = require('sequelize');
const db = require('./index.js');
const crypto = require('crypto');
const _ = require('lodash');

// define model
const User = db.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.INTEGER,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  // salt and hash again when user enters their password
  // for the first time or when they change password
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = { User, db };
