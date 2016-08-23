// jshint -W106
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
'use strict';

var passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function(req, res) {
	res.json(req.user.user_info);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function(req, res) {
	if (req.user) {
		req.logout();
		res.send(200);
	} else {
		res.send(400, 'Not logged in');
	}
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function(req, res, next) {
	passport.authenticate('login', function(err, user, info) {
		var error = err || info;
		if (error) {
			return res.json(400, error);
		}

		if(!user.isActive) {
			res.json(400, {
				code: 'INACTIVE_PROFILE',
				message: 'User profile is not activated'
			});
		} else {
			req.logIn(user, function(err) {
				if (err) {
					return res.send(err);
				}
				res.json(req.user.user_info);
			});
		}
	})(req, res, next);
};
