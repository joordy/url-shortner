const mongoose = require('mongoose');
const shortID = require('shortid');

const shortUrlScheme = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortID.generate,
  },
  date: { type: String, default: Date.now },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('shortURL', shortUrlScheme);
