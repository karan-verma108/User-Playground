require('dotenv').config();
require('./controllers/dbController');
const express = require('express');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(require('./controllers/controllers'));

const { dbConnect } = require('./controllers/dbController');


//Listening on the server
app.listen(PORT, (err) => {
    dbConnect();
    if (err) throw err;
    console.log(`Express server is listening on port : ${PORT}`);
});