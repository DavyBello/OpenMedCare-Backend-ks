const keystone = require('keystone');
const Types = keystone.Field.Types;

const { STATES, GENDERS, CANDIDATE_CATEGORIES, PHONE_REGEX, toCamelCase  } = require('../lib/util');

/**
 * HPStaff Model
 * ==========
 */
const HPStaff = new keystone.List('HPStaff', {
	inherits: keystone.list('User')
});

HPStaff.add('HPStaff', {
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
}, 'Healtcare provider', {
	provider: { type: Types.Relationship, ref: 'HealthcareProvider', many: false, initial: true, required: true }
}, 'Status', {
	isVerified: { type: Boolean, default: false }
});

// Model Hooks
HPStaff.schema.pre('save', function (next) {
	next();
});

/**
 * Relationships
 */
// HPStaff.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
HPStaff.defaultColumns = 'name, phone, sex, dateOfBirth, state';
HPStaff.register();
