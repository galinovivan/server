const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const projectModel = require('./api/models/projectModel');
const bodyParser = require('koa-bodyparser');
const port = process.env.PORT || 3000;
const logger = require('koa-logger');

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const routes = require('./api/routes/projectRoutes');

const app = koa();
const router = new Router();


app.use(logger());
app.use(bodyParser());

app.use(passport.initialize());
app.use(router.routes());
routes(router);
app.listen(port, () => {
   console.log('app is run on port: ' + port);
});
