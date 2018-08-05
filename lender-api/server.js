var db = require('./db');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var port = process.env.PORT || 8081;
var contracts = require('./routes/contracts');

//Middleware
app.use(bodyparser.json())
app.use('/contracts', contracts);
app.use((err,req,res) =>{
    console.log('error: ' + err);
    res.status(500).send(err);
});

app.listen(port);
console.log('contracts API started on port: ' + port);

