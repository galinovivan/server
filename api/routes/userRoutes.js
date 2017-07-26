const User = require('../models/userModel');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../const/jwtsecret');
module.exports = (app) => {
  app.post('/user', async(ctx, next) => {
      try {
          ctx.body = await User.create(ctx.request.body);
      }
      catch (err) {
          ctx.status = 400;
          ctx.body = err;
      }
  });

  app.post('/login', async(ctx, next) => {
      await passport.authenticate('local', function(err, user) {
          if (user === false) {
              ctx.body = 'login failed';
          } else {
              const payload = {
                  id: user.id,
                  displayName: user.displayName,
                  email: user.user.email
              };
              const token = jwt.sign(payload, jwtSecret());
              ctx.body = {
                  user: user.displayName,
                  token: "JWT" + token
              };
          }
      })(ctx, next);
  })
};

  app.get('/custom', async(ctx, next) => {
     await passport.authenticate('jwt', function(err, user) {
         if (user) {
             ctx.body = "Hello " + user.displayName;
         } else {
             ctx.body = "No such user";
             console.log('err', err);
         }
     })(ctx, next)
  });