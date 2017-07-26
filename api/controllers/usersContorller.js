const mongoose = require('mongoose');
const userModel = mongoose.model('Users');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = "mysecret";

module.exports = () => {
  passport.use(new LocalStrategy({
      _usernameFiled: 'email',
      _passwordField: 'password',
      _session: false
  },
      function(email, password, done) {
      userModel.findOne({email}, (err, user) => {
          if (err) {
              return done(err);
          }

          if (!user || !user.checkPassword(password)) {
              return done(null, false, {message: 'Unvalid user'});
          }
          return done(null, user);
      })
      }));
    const jwmOptions = {
        _jwtFromRequest: ExtractJwt.fromAuthHelper(),
        _secretOrKey: jwtsecret
    };

    passport.use(new JwtStrategy(jwmOptions, function(payload, done) {
        User.findById(payload.id, (err, user) => {
            if (err) return done(err);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
    }))
};