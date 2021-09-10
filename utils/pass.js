'use strict';
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
       // console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }
        if(!bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }

        delete user.password; // poista salasana
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'nbfgfhttdrjjulkbgdskk66e43g6v',
    },
    async (jwtPayload, done) => {

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        const user = await userModel.getUser(jwtPayload.user_id);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
));

module.exports = passport;