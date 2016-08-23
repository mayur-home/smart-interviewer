'use strict';

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('../modules/user/user.schema');

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({_id: id}, function(err, user) {
		done(err, user);
	});
});

// Use login strategy
passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		User.findOne({email: email}, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					code: 'UNREGISTERED_EMAIL',
					message: 'Email is not registered.'
				});
			}
			if (!user.authenticate(password)) {
				return done(null, false, {
					code: 'INCORRECT_PASSWORD',
					message: 'Password is incorrect.'
				});
			}
			return done(null, user);
		});
	}
));

module.exports = passport;
