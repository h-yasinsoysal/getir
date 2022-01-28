const mongoose = require('mongoose');

const MONGODB_CONNECTION_URI = 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study';

mongoose.connect(MONGODB_CONNECTION_URI, {useNewUrlParser: true});
