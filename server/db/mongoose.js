var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // s tem Mongoosu povemo, katero knjižnico za promise naj uporabi
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = { mongoose };