const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', require('./routes'));  


module.exports = app;
