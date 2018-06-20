const keystone = require('keystone');
const Types = keystone.Field.Types;

const { STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase  } = require('../lib/util');

/**
 * CHU Model
 * ==========
 */
const CHU = new keystone.List('CHU', {
	inherits: keystone.list('User')
});

CHU.add('CHU', {
	// name: { type: Types.Name, required: true, index: true },
	staffId: { type: Types.Text, initial: false},
	// email: { type: Types.Email, initial: false, sparse: true, unique: true, index: true },
	phone: { type: Types.Text, initial: true, sparse: true, unique: true, index: true, required: true },
	// password: { type: Types.Password, initial: true, required: true },
}, 'Details', {
	sex: {type: Types.Select, options: GENDERS, initial: true},
	address: { type: Types.Text, initial: true },
	// stateOfResidence: {type: Types.Select, options: STATES, initial: true},
	// state: { type: Types.Relationship, ref: 'State', many: false, initial: true },
	// lga: {type: Types.Select, options: STATES, display: "Local Government", initial: true},
	localGovernment: { type: Types.Relationship, ref: 'LocalGovernment', many: false, initial: true },
	dateOfBirth: { type: Types.Date, initial: true },
	stateOfOrigin: { type: Types.Text, initial: false},
}, 'Status', {
	isVerified: { type: Boolean, default: false },
	isActive: { type: Boolean, default: false }
});

// Model Hooks
CHU.schema.pre('save', function (next) {
	next();
});

/**
 * Relationships
 */
// CHU.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
CHU.defaultColumns = 'name, phone, sex, dateOfBirth, state';
CHU.register();
