const express = require('express');
const app = express();
const mongoose = require('mongoose');
const projectModel = require('./api/models/projectModel');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/self');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});
const routes = require('./api/routes/projectRoutes');
routes(app);


app.listen(port, () => {
   console.log('app is run on port: ' + port);
});
