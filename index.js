const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = 5000;

connectDB();

app.use(express.json({ extended: false }));
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(port, () => console.log(`Server runs on ${port}`));
