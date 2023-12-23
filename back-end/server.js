const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const verifyJWT = require('./middleware/verifyJWT');

//importing routes
const elementRoutes = require('./routes/elementRoute');
const userRoutes = require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Database connection established successfully'))
    .catch((err) => console.log(`Error connecting to the database: ${err}`));

app.get('/', (req, res) => {
    res.send('Hello Engineers!');
});

app.use('/api/v1/', userRoutes);
app.use('/api/v1',verifyJWT, elementRoutes);





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});