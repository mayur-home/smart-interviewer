var mongoose = require('mongoose');
var base64 = require('base-64');
var randtoken = require('rand-token');

var Schema = mongoose.Schema;
var userSchema = new Schema({
	// creating index on field id
	id: {type: Number, index: true},
	firstName: String,
	lastName: String,
	email: String,
	hashedPassword: String,
	isActive: Boolean,
	activateToken: String,
	tests: [{type: Schema.Types.ObjectId, ref: 'Usertest'}]
});

/**
 * Virtuals
 */
userSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

userSchema
	.virtual('user_info')
	.get(function() {
		return {
			_id: this._id,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName
		};
	});

/**
 * Methods
 */
userSchema.methods = {

	/**
	 * Authenticate - check if the passwords are the same
	 */

	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	/**
	 * Encrypt password
	 */

	encryptPassword: function(password) {
		return base64.encode(password);
	}
};

var User = mongoose.model('User', userSchema);

module.exports = User;
