var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');
var User = require('../models/User');

/**
 * POST /login
 * Sign in using email and password.
 * @param {string} email
 * @param {string} password
 */

exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json(errors);
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json([{param: 'password', msg: info.message}]);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({isAuthenticated: true, userID: user._id, email: user.email, name: user.profile.name});
    });
  })(req, res, next);
};

/**
 * POST /signup
 * Create a new local account.
 * @param {string} email
 * @param {string} password
 */

exports.postSignup = function(req, res, next) {
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    return res.json(errors);
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        errors = [{msg: 'User already exists.'}];
      } else {
        errors = [{msg: 'Signup error.'}];
      }
      return res.json(errors);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({isAuthenticated: true, userID: user._id, email: user.email, name: user.profile.name});
    });
  });
};

/**
 * GET /logout
 * Log out.
 */

exports.logout = function(req, res) {
  req.logout();
  res.json({loggedOut: true});
};
