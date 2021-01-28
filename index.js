const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app
  .set('view engine', 'ejs')
  // .set('views', 'view-ejs')
  .use(express.static('static'))
  .use(express.json({ extended: false }))
  .use('/', require('./routes/index'))
  .use('/api/url', require('./routes/url'));

app.get('/', async (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`Server runs on ${port}`));
