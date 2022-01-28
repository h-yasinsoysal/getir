var express = require('express');
const bodyParser = require('body-parser');
var recordRouter = require('./routes/index');
const mongoose = require("mongoose");

var app = express();
const router = express.Router();
const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use('/', recordRouter);

module.exports = app;
