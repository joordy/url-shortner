const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortID: {
    type: String,
    required: true,
  },
  date: { type: String, default: Date.now },
});

const ShortUrl = mongoose.model('shortUrl', ShortUrlSchema);

module.exports = ShortUrl;
