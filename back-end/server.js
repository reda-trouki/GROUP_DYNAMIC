const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Database connection established successfully'))
    .catch((err) => console.log(`Error connecting to the database: ${err}`));

app.get('/', (req, res) => {
    res.send('Hello 3tacha!');
});

app.get('/courses', (req, res) => {
    res.send('courses');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
