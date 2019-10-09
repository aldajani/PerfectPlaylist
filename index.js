/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playlists', { connectTimeoutMS: 2000, useMongoClient: true }, (err) => {
  if (err) return console.log('mongoose connection error', err);
  return console.log('mongoose connected successfully');
});

const db = mongoose.connection;

module.exports = db;
