var keystone = require('keystone');
var Types = keystone.Field.Types;

const { PHONE_REGEX, toCamelCase  } = require('../lib/util');

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	passwordVersion: { type: Types.Number, default: 1 },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true, noedit: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

// Model Hooks
User.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
  this.name.first = toCamelCase(this.name.first);
  this.name.last = toCamelCase(this.name.last);
	if (this.phone) {
		if (PHONE_REGEX.test(this.phone)){
			next();
		} else {
			next(new Error('Invalid Phone Number'));
		}
	}
	next();
});

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
