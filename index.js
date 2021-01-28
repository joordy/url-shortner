const express = require('express');
const mongoose = require('mongoose');
const shortID = require('shortid');
const createHttpError = require('http-errors');
const ShortUrl = require('./models/url.model');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app
  .set('view engine', 'ejs')
  .use(express.static('static'))
  .use(express.json({ extended: false }))
  .use(express.urlencoded({ extended: false }));

mongoose
  .connect(`${process.env.MONGOKEY}`, {
    dbName: 'shortner',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('mongoDB database connected');
  })
  .catch((err) => {
    console.log('Error connecting...');
  });

app.get('/', async (req, res, next) => {
  res.render('index');
});

app.post('/', async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url) {
      throw createHttpError.BadRequest('Provide a valid url');
    }
    const validUrl = await ShortUrl.findOne({ url });
    if (validUrl) {
      res.render('index', {
        short_url: `${req.headers.host}/${validUrl.shortID}`,
      });
      return;
    }
    const shortUrl = new ShortUrl({ url: url, shortID: shortID.generate() });
    const result = await shortUrl.save();
    res.render('index', {
      short_url: `${req.headers.host}/${result.shortID}`,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/:shortID', async (req, res, next) => {
  try {
    const { shortID } = req.params;
    const result = await ShortUrl.findOne({ shortID });

    if (!result) {
      throw createHttpError.NotFound('ShortUrl does not exist yet.');
    }

    res.redirect(result.url);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('index', { error: err.message });
});

app.listen(port, () => console.log(`Server runs on ${port}`));
