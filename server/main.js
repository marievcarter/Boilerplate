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
